const db = require("../config/db");
const QRCode = require("qrcode");

// ➕ Add Student
exports.addStudent = async (req, res) => {
  const { name, roll_no, department, year } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const qrData = `http://localhost:3000/student/${roll_no}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const sql = `INSERT INTO students 
    (name, roll_no, department, year, qr_code, photo)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, roll_no, department, year, qrCode, photo], (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Student added", qrCode });
    });

  } catch (err) {
    res.status(500).json(err);
  }
};

// 📄 Get Student
exports.getStudent = (req, res) => {
  const { roll_no } = req.params;

  db.query("SELECT * FROM students WHERE roll_no = ?", [roll_no], (err, result) => {
    if (err) return res.status(500).json(err);

    if (!result.length) return res.status(404).json({ message: "Not found" });

    res.json(result[0]);
  });
};
exports.getStudentByRoll = (req, res) => {
  const roll_no = req.params.roll_no;

  db.query(
    "SELECT * FROM students WHERE roll_no = ?",
    [roll_no],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      res.json(result[0]);
    }
  );
};

// ❌ Delete Student
exports.deleteStudent = (req, res) => {
  const roll_no = req.params.roll_no;

  db.query(
    "DELETE FROM students WHERE roll_no = ?",
    [roll_no],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted" });
    }
  );
};

// 📊 Dashboard Stats
exports.getStats = (req, res) => {
  const totalQuery = "SELECT COUNT(*) AS total FROM students";
  const deptQuery = "SELECT department, COUNT(*) AS count FROM students GROUP BY department";

  db.query(totalQuery, (err, totalResult) => {
    if (err) return res.status(500).json(err);

    db.query(deptQuery, (err, deptResult) => {
      if (err) return res.status(500).json(err);

      res.json({
        totalStudents: totalResult[0].total,
        departmentStats: deptResult
      });
    });
  });
};

// 🔍 Search
exports.searchStudent = (req, res) => {
  const { roll_no } = req.query;

  db.query("SELECT * FROM students WHERE roll_no LIKE ?", [`%${roll_no}%`], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};