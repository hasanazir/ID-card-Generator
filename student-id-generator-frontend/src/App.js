import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import StudentView from "./pages/StudentView";
import DeleteStudent from "./pages/DeleteStudent";
import "./styles.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/student/:roll_no" element={<StudentView />} />
        <Route path="/delete" element={<DeleteStudent />} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;