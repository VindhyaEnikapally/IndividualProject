const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const codeRoutes = require("./routes/codeRoutes");
const folderRoutes = require("./routes/folderRoutes");
const savedCodeRoutes = require("./routes/savedCodeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/codes", savedCodeRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});