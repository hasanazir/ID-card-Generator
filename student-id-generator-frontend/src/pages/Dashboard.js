import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import api from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState("");
  const [student, setStudent] = useState(null); // ✅ IMPORTANT

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/students/stats")
      .then(res => setStats(res.data));
  }, []);

  const handleSearch = async () => {
    try {
      const res = await api.get(`/students/${search}`);
      setStudent(res.data);
    } catch {
      alert("Student not found");
    }
  };

  const downloadCard = () => {  // ✅ IMPORTANT
    const card = document.getElementById("id-card");

    html2canvas(card).then(canvas => {
      const link = document.createElement("a");
      link.download = `${student.roll_no}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>📊 Dashboard</h2>

      <h3>Total Students: {stats.totalStudents}</h3>

      <h3>Departments</h3>
      {stats.departmentStats.map((d, i) => (
        <div key={i} className="department">
          {d.department}: {d.count}
        </div>
      ))}

      {/* 🔍 SEARCH */}
      <h3>Search Student</h3>
      <input
        placeholder="Enter Roll Number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="btn-primary" onClick={handleSearch}>
        Search
      </button>

      {/* 🎴 ID CARD */}
      {student && (
        <div id="id-card">
          <h3>🎓 College ID Card</h3>

          <img
            src={`http://localhost:5000/uploads/${student.photo}`}
            alt="student"
            width="100"
            style={{ borderRadius: "10px" }}
          />

          <p><b>Name:</b> {student.name}</p>
          <p><b>Roll:</b> {student.roll_no}</p>
          <p><b>Dept:</b> {student.department}</p>
          <p><b>Year:</b> {student.year}</p>

          <img src={student.qr_code} alt="QR" width="100" />

          <br />

          <button className="btn-primary" onClick={downloadCard}>
            ⬇ Download
          </button>
        </div>
      )}

      <br />

      {/* ACTION BUTTONS */}
      <div style={{ textAlign: "center" }}>
        <button className="btn-add" onClick={() => navigate("/add")}>
          ➕ Add Student
        </button>

        <button className="btn-delete" onClick={() => navigate("/delete")}>
          ❌ Delete Student
        </button>
      </div>
    </div>
  );
}