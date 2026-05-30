import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Folders.css";
import API_URL from "../config";

const Folders = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [expandedFolderId, setExpandedFolderId] = useState(null);
  const [folderCodes, setFolderCodes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch Folders
  const fetchFolders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_URL}/api/folders`, authHeader);
      setFolders(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load folders. Please log in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Please log in to manage your folders.");
      setLoading(false);
      return;
    }
    fetchFolders();
  }, []);

  // Create Folder
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    try {
      const response = await axios.post(
        `${API_URL}/api/folders`,
        { name: newFolderName.trim() },
        authHeader
      );
      setFolders([response.data, ...folders]);
      setNewFolderName("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create folder");
    }
  };

  // Delete Folder
  const handleDeleteFolder = async (folderId, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this folder and all saved codes inside it?")) return;
    try {
      await axios.delete(`${API_URL}/api/folders/${folderId}`, authHeader);
      setFolders(folders.filter(f => f._id !== folderId));
      if (expandedFolderId === folderId) setExpandedFolderId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete folder");
    }
  };

  // Toggle Folder & fetch codes
  const handleToggleFolder = async (folderId) => {
    if (expandedFolderId === folderId) {
      setExpandedFolderId(null);
      return;
    }
    setExpandedFolderId(folderId);
    try {
      const response = await axios.get(
        `${API_URL}/api/codes/${folderId}`,
        authHeader
      );
      setFolderCodes(prev => ({ ...prev, [folderId]: response.data }));
    } catch (err) {
      console.error(err);
      alert("Failed to load saved codes");
    }
  };

  // Delete Code
  const handleDeleteCode = async (codeId, folderId, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this saved code?")) return;
    try {
      await axios.delete(`${API_URL}/api/codes/${codeId}`, authHeader);
      setFolderCodes(prev => ({
        ...prev,
        [folderId]: prev[folderId].filter(c => c._id !== codeId)
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete saved code");
    }
  };

  // Load Code into Editor
  const handleLoadCode = (savedItem) => {
    navigate("/dashboard", {
      state: {
        code: savedItem.code,
        language: savedItem.language,
        output: savedItem.output
      }
    });
  };

  if (!token) {
    return (
      <div className="folders-container">
        <div className="error-box-folders">
          <h2>Access Denied</h2>
          <p>Please log in to manage your folders.</p>
          <button onClick={() => navigate("/login")} className="login-redirect-btn">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="folders-container">
      <div className="folders-header-section">
        <h1>My Code Folders</h1>
        <p>Organize your algorithms, code, and execution results for future reference.</p>
      </div>

      <form onSubmit={handleCreateFolder} className="create-folder-form">
        <input
          type="text"
          placeholder="New folder name (e.g. Dynamic Programming)"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button type="submit">+ Create Folder</button>
      </form>

      {loading ? (
        <div className="folders-loading">Loading folders...</div>
      ) : error ? (
        <div className="folders-error">{error}</div>
      ) : folders.length === 0 ? (
        <div className="folders-empty">
          No folders yet. Create one above, then save your code from the Workspace!
        </div>
      ) : (
        <div className="folders-list">
          {folders.map(folder => {
            const isExpanded = expandedFolderId === folder._id;
            const codes = folderCodes[folder._id] || [];

            return (
              <div key={folder._id} className={`folder-item ${isExpanded ? "expanded" : ""}`}>
                <div className="folder-title-bar" onClick={() => handleToggleFolder(folder._id)}>
                  <div className="folder-info">
                    <span className="folder-icon">{isExpanded ? "📂" : "📁"}</span>
                    <span className="folder-name">{folder.name}</span>
                    <span className="folder-count">
                      {isExpanded ? `${codes.length} file(s)` : ""}
                    </span>
                  </div>
                  <div className="folder-actions">
                    <span className="folder-chevron">{isExpanded ? "▲" : "▼"}</span>
                    <button
                      className="delete-folder-btn"
                      onClick={(e) => handleDeleteFolder(folder._id, e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="folder-content">
                    {codes.length === 0 ? (
                      <div className="no-codes-message">
                        This folder is empty. Run your code in the Workspace and save it here.
                      </div>
                    ) : (
                      <div className="codes-grid">
                        {codes.map(codeItem => (
                          <div key={codeItem._id} className="code-card">
                            <div className="code-card-header">
                              <h4>{codeItem.title}</h4>
                              <span className="code-lang-tag">{codeItem.language.toUpperCase()}</span>
                            </div>
                            <div className="code-card-body">
                              <pre className="code-preview">
                                {codeItem.code.split("\n").slice(0, 5).join("\n")}
                                {codeItem.code.split("\n").length > 5 && "\n..."}
                              </pre>
                            </div>
                            {codeItem.output && (
                              <div className="code-card-output">
                                <strong>Output:</strong>
                                <pre>
                                  {codeItem.output.split("\n").slice(0, 3).join("\n")}
                                  {codeItem.output.split("\n").length > 3 && "\n..."}
                                </pre>
                              </div>
                            )}
                            <div className="code-card-footer">
                              <span className="code-date">
                                {new Date(codeItem.createdAt).toLocaleDateString("en-IN", {
                                  day: "2-digit", month: "short", year: "numeric"
                                })}
                              </span>
                              <div className="code-card-actions">
                                <button
                                  className="load-code-btn"
                                  onClick={() => handleLoadCode(codeItem)}
                                >
                                  Load in Editor
                                </button>
                                <button
                                  className="delete-code-btn"
                                  onClick={(e) => handleDeleteCode(codeItem._id, folder._id, e)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Folders;
