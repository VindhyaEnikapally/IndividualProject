const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createFolder,
  getFolders,
  deleteFolder,
} = require("../controllers/folderController");

// Folder operations only
router.post("/", authMiddleware, createFolder);
router.get("/", authMiddleware, getFolders);
router.delete("/:id", authMiddleware, deleteFolder);

module.exports = router;
