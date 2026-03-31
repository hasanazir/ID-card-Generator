import { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
export default function StudentView() {
  const { roll_no } = useParams();
  const [student, setStudent] = useState(null);
  const downloadCard = () => {
    const card = document.getElementById("id-card");

    html2canvas(card).then(canvas => {
     const link = document.createElement("a");
     link.download = "id-card.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };
  useEffect(() => {
    api.get(`/students/${roll_no}`)
      .then(res => setStudent(res.data))
      .catch(() => alert("Student not found"));
  }, []);

  if (!student) return <h3>Loading...</h3>;

 return (
  <div>
  <div id="id-card" >
    <h3>College ID Card</h3>
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

    <img src={student.qr_code} alt="QR" width="100"/></div>
    <button  className="btn-primary" onClick={downloadCard}>
    Download ID Card
    </button>
  </div>
  
);
}