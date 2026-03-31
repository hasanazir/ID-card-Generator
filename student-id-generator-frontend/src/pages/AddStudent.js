import { useState } from "react";
import api from "../api";

export default function AddStudent() {
  const [form, setForm] = useState({});
  const [qr, setQr] = useState("");

  const handleSubmit = async () => {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("roll_no", form.roll_no);
  formData.append("department", form.department);
  formData.append("year", form.year);
  formData.append("photo", form.photo);

  const res = await api.post("/students/add", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  setQr(res.data.qrCode);
};

  return (
    <div className="container">
      <h2>Add Student</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Roll No" onChange={e => setForm({...form, roll_no: e.target.value})}/>
      <input placeholder="Department" onChange={e => setForm({...form, department: e.target.value})}/>
      <input placeholder="Year" onChange={e => setForm({...form, year: e.target.value})}/>
      <input type="file" onChange={(e) => setForm({...form, photo: e.target.files[0]})}/>
      <button  className="btn-primary" onClick={handleSubmit}>Add</button>

      {qr && (
        <>
          <h3>QR Code:</h3>
          <img src={qr} alt="QR"/>
        </>
      )}
    </div>
  );
}