const Folder = require("../models/Folder");
const SavedCode = require("../models/SavedCode");

// Create Folder
const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Folder name is required" });
    }
    const newFolder = new Folder({
      name: name.trim(),
      userId: req.userId
    });
    await newFolder.save();
    res.status(201).json(newFolder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Folders
const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Folder
const deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    // Delete all codes inside the folder first
    await SavedCode.deleteMany({ folderId, userId: req.userId });
    // Delete the folder itself
    const folder = await Folder.findOneAndDelete({ _id: folderId, userId: req.userId });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    res.status(200).json({ message: "Folder and its codes deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save Code in Folder
const saveCodeInFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const { title, code, language, output } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Code title is required" });
    }
    if (!code || code.trim() === "") {
      return res.status(400).json({ message: "Code content is required" });
    }
    if (!language) {
      return res.status(400).json({ message: "Language is required" });
    }

    const newCode = new SavedCode({
      title: title.trim(),
      code,
      language,
      output: output || "",
      folderId,
      userId: req.userId
    });

    await newCode.save();
    res.status(201).json(newCode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Codes in Folder
const getCodesInFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const codes = await SavedCode.find({ folderId, userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Code
const deleteCode = async (req, res) => {
  try {
    const code = await SavedCode.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!code) {
      return res.status(404).json({ message: "Saved code not found" });
    }
    res.status(200).json({ message: "Saved code deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFolder,
  getFolders,
  deleteFolder,
  saveCodeInFolder,
  getCodesInFolder,
  deleteCode
};
