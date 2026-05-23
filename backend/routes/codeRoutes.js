const express = require("express");

const router = express.Router();

const {
  runCode,
  evaluateCode
} = require("../controllers/codeController");

// RUN

router.post("/run", runCode);

// EVALUATE

router.post("/evaluate", evaluateCode);

module.exports = router;