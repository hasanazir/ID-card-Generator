import { useState } from "react";
import api from "../api";

export default function DeleteStudent() {
  const [id, setId] = useState("");

  const handleDelete = async () => {
    try {
      await api.delete(`/students/${id}`);
      alert("Student deleted");
    } catch (err) {
      alert("Error deleting student");
    }
  };

  return (
    <div className="container">
      <h2>Delete Student</h2>

      <input
        placeholder="Enter Student ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button className="btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}