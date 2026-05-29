/*
import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "../styles/editor.css";

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`console.log("Hello World");`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  
  // RUN CODE
  const runCode = async () => {
    setError("");
    setOutput("Running...");
    try {
      const response = await axios.post("http://localhost:5000/api/code/run",
        {
          language,
          code,
          input
        }
      );
      setOutput(response.data.stdout || "No Output");
      if(response.data.stderr){
        setError(response.data.stderr);
      }
      if(response.data.compile_output){
        setError(response.data.compile_output);
      }
    } catch(err){
      console.log(err);
      setError("Execution Failed");
    }
  };

  // EVALUATE CODE
  const evaluateCode = async () => {
    setError("");
    setOutput("Evaluating...");
    try {
      const response = await axios.post("http://localhost:5000/api/code/evaluate",
        {
          language,
          code,
          input
        }
      );
      setOutput(`OUTPUT:${response.data.stdout || "No Output"}
-----------------------------------
Execution Time:
${response.data.executionTime}s
Memory Usage:
${response.data.memory} KB
-----------------------------------
Time Complexity:
${response.data.timeComplexity}
Nested Loops:
${response.data.nestedLoops}
Recursion Detected:
${response.data.recursionDetected}
Memoization Used:
${response.data.memoizationUsed}
Optimization:
${response.data.optimization}
-----------------------------------
Final Score:
${response.data.score}%
Rating:
${response.data.rating}`
      );
    } catch(err){
      console.log(err);
      setError("Evaluation Failed");
    }
  };
  return (
    <div className="main-container">
      <div className="top-bar">
        <h2>Online Code Judge</h2>
        <div className="left-controls">
          <select
            value={language}
            onChange={(e) =>
            setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          <button
            className="run-btn"
            onClick={runCode}> Run
          </button>
          <button
            className="evaluate-btn"
            onClick={evaluateCode}>
            Evaluate
          </button>
        </div>
      </div>
      <div className="main-body">
        <div className="editor-container">
          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) =>
            setCode(value)}
          />
        </div>
        <div className="output-container">
          <h3>Output & Analysis</h3>
          <pre>
            {output || "No Output"}
          </pre>
        </div>        
        <div className="side-panel">
        <div className="input-box">
        <h3>Input</h3>
        <textarea
            placeholder="Enter Input"
            value={input}
              onChange={(e) =>
              setInput(e.target.value)}
            />
          </div>
          <div className="error-box">
            <h3>Errors</h3>
            <pre>
                {error || "No Errors"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
*/

import React, { useState, useEffect } from "react";

import axios from "axios";

import Editor from "@monaco-editor/react";

import { useLocation } from "react-router-dom";

import "../styles/editor.css";

const CodeEditor = () => {

  const location = useLocation();

  // Support loading code from Folders page
  const preloaded = location.state || {};

  const [language, setLanguage] =
  useState(preloaded.language || "javascript");

  const [code, setCode] =
  useState(preloaded.code || `console.log("Hello World");`);

  const [input, setInput] =
  useState("");

  const [output, setOutput] =
  useState(preloaded.output || "");

  const [error, setError] =
  useState("");

  // Save to Folder panel state
  const [showSavePanel, setShowSavePanel] =
  useState(false);

  const [folders, setFolders] =
  useState([]);

  const [selectedFolderId, setSelectedFolderId] =
  useState("");

  const [codeTitle, setCodeTitle] =
  useState("");

  const [saving, setSaving] =
  useState(false);

  const token = localStorage.getItem("token");

  // Fetch folders when save panel is opened
  useEffect(() => {
    if (showSavePanel && token) {
      axios.get("http://localhost:5000/api/folders", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setFolders(res.data);
        if (res.data.length > 0) {
          setSelectedFolderId(res.data[0]._id);
        }
      })
      .catch(err => console.error("Failed to load folders", err));
    }
  }, [showSavePanel, token]);

  // RUN CODE

  const runCode = async () => {

    setError("");

    setOutput("Running...");

    try {

      const response = await axios.post(

        "http://localhost:5000/api/code/run",

        {
          language,
          code,
          input
        }
      );

      // STANDARDIZED OUTPUT

      const finalOutput =

        response.data.stdout ||
        response.data.output ||
        response.data.run?.stdout ||
        "No Output";

      setOutput(finalOutput);

      // STANDARDIZED ERROR

      const finalError =

        response.data.stderr ||
        response.data.compile_output ||
        response.data.run?.stderr ||
        "";

      setError(finalError);

    } catch(err){

      console.log(err);

      setError("Execution Failed");

      setOutput("");
    }
  };

  // EVALUATE CODE

  const evaluateCode = async () => {

    setError("");

    setOutput("Evaluating...");

    try {

      const response = await axios.post(

        "http://localhost:5000/api/code/evaluate",

        {
          language,
          code,
          input
        }
      );

      const finalOutput =

        response.data.stdout ||
        response.data.output ||
        response.data.run?.stdout ||
        "No Output";

      setOutput(

`OUTPUT:
${finalOutput}

-----------------------------------

Execution Time:
${response.data.executionTime || 0}s

Memory Usage:
${response.data.memory || 0} KB

-----------------------------------

Time Complexity:
${response.data.timeComplexity || "Unknown"}


-----------------------------------

Final Score:
${response.data.score || 0}%

Rating:
${response.data.rating || "Average"}`
      );

      // SHOW ERRORS ALSO

      const finalError =

        response.data.stderr ||
        response.data.compile_output ||
        response.data.run?.stderr ||
        "";

      setError(finalError);

    } catch(err){

      console.log(err);

      setError("Evaluation Failed");

      setOutput("");
    }
  };

  // SAVE CODE TO FOLDER

  const handleSaveCode = async () => {

    if (!token) {
      alert("Please log in to save code.");
      return;
    }

    if (!codeTitle.trim()) {
      alert("Please enter a title for this code.");
      return;
    }

    if (!selectedFolderId) {
      alert("Please select a folder or create one first.");
      return;
    }

    setSaving(true);

    try {

      await axios.post(
        `http://localhost:5000/api/codes/${selectedFolderId}`,
        {
          title: codeTitle.trim(),
          code,
          language,
          output
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Code saved to folder successfully!`);
      setShowSavePanel(false);
      setCodeTitle("");

    } catch(err) {

      console.error(err);
      alert(err.response?.data?.message || "Failed to save code");

    } finally {
      setSaving(false);
    }
  };

  return (

    <div className="main-container">

      {/* TOP BAR */}

      <div className="top-bar">

        <h2>Workspace</h2>

        <div className="left-controls">

          <select
            value={language}
            onChange={(e) =>
            setLanguage(e.target.value)}
          >

            <option value="javascript">
              JavaScript
            </option>

            <option value="cpp">
              C++
            </option>

            <option value="python">
              Python
            </option>

            <option value="java">
              Java
            </option>

          </select>

          <button
            className="run-btn"
            onClick={runCode}
          >
            Run
          </button>

          <button
            className="evaluate-btn"
            onClick={evaluateCode}
          >
            Evaluate
          </button>

          <button
            className="save-btn"
            onClick={() => setShowSavePanel(true)}
          >
            💾 Save
          </button>

        </div>

      </div>

      {/* SAVE TO FOLDER MODAL */}

      {showSavePanel && (
        <div className="save-modal-overlay" onClick={() => setShowSavePanel(false)}>
          <div className="save-modal" onClick={(e) => e.stopPropagation()}>

            <h3>Save Code to Folder</h3>

            <label>Code Title</label>
            <input
              type="text"
              className="save-modal-input"
              placeholder="e.g. Factorial using recursion"
              value={codeTitle}
              onChange={(e) => setCodeTitle(e.target.value)}
            />

            <label>Select Folder</label>
            {folders.length === 0 ? (
              <div className="save-modal-empty">
                No folders found. Create a folder from the <strong>Folders</strong> page first.
              </div>
            ) : (
              <select
                className="save-modal-select"
                value={selectedFolderId}
                onChange={(e) => setSelectedFolderId(e.target.value)}
              >
                {folders.map(f => (
                  <option key={f._id} value={f._id}>{f.name}</option>
                ))}
              </select>
            )}

            <div className="save-modal-footer">
              <button className="save-modal-cancel" onClick={() => setShowSavePanel(false)}>
                Cancel
              </button>
              <button
                className="save-modal-confirm"
                onClick={handleSaveCode}
                disabled={saving || folders.length === 0}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MAIN BODY */}

      <div className="main-body">

        {/* CODE EDITOR */}

        <div className="editor-container">

          <Editor
            height="100%"
            width="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) =>
            setCode(value)}
          />

        </div>

        {/* OUTPUT */}

        <div className="output-container">

          <h3>Output & Analysis</h3>

          <pre>
            {output || "No Output"}
          </pre>

        </div>

        {/* SIDE PANEL */}

        <div className="side-panel">

          {/* INPUT */}

          <div className="input-box">

            <h3>Input</h3>

            <textarea
              placeholder="Enter Input"
              value={input}
              onChange={(e) =>
              setInput(e.target.value)}
            />

          </div>

          {/* ERRORS */}

          <div className="error-box">

            <h3>Errors</h3>

            <pre>
              {error || "No Errors"}
            </pre>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CodeEditor;