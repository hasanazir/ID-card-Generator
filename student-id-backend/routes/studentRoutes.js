const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/studentController");
const upload = require("../middleware/upload");

router.post("/add", upload.single("photo"), ctrl.addStudent);
router.get("/stats", ctrl.getStats);
router.get("/search", ctrl.searchStudent);
router.get("/:roll_no", ctrl.getStudent);
// GET student by roll_no
router.get("/:roll_no", ctrl.getStudentByRoll);
router.delete("/:roll_no", ctrl.deleteStudent);

module.exports = router;