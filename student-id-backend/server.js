const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});