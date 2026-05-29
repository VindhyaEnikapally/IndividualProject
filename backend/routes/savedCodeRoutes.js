const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveCodeInFolder,
  getCodesInFolder,
  deleteCode
} = require("../controllers/folderController");

// Code operations (mounted at /api/codes)
router.post("/:folderId", authMiddleware, saveCodeInFolder);
router.get("/:folderId", authMiddleware, getCodesInFolder);
router.delete("/:id", authMiddleware, deleteCode);

module.exports = router;
