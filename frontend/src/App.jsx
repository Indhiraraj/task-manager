import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage";
// import EmployeePage from "./EmployeePage";
import Login from "./components/Login";
// import Unauthorized from "./Unauthorized";
import ProtectedRoute from "./auth/ProtectedRoute";
import EmployeePage from "./components/EmployeePage";
import SubModuleManager from "./components/SubModuleManager";
import EmployeeTaskChart from "./components/dashboard";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} allowedRoles={["admin"]} />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<EmployeeTaskChart />} allowedRoles={["admin"]} />} />
        <Route path="/admin/leaderboard" element={<ProtectedRoute element={<Leaderboard />} allowedRoles={["admin"]} />} />

        <Route path="/employee" element={<ProtectedRoute element={<EmployeePage />} allowedRoles={["employee"]} />} />
        <Route path="/sub-module/:taskId" element={<ProtectedRoute element={<SubModuleManager />} allowedRoles={["employee"]} />} />
      </Routes>
    </Router>
  );
}

export default App;
