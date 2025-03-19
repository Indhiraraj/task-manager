import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

const API_URL = "http://localhost:5000/api/tasks";
const EMPLOYEE_API_URL = "http://localhost:5000/api/employees";

export default function AdminPage() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [task, setTask] = useState({
    name: "",
    assigned_to: "",
    description: "",
    priority: "",
    deadline: "", // Empty by default (user selects the date)
  });

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(EMPLOYEE_API_URL);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const getEmployeeName = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    return employee ? employee.name : "Unknown";
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      fetchTasks();
      setIsFormOpen(false);
      setTask({ name: "", assigned_to: "", description: "", priority: "", deadline: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
        <div className="flex justify-center mb-4">
          <Button onClick={() => setIsFormOpen(!isFormOpen)}>
            {isFormOpen ? "Close Form" : "Add Task"}
          </Button>
        </div>
        {isFormOpen && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={task.name} onChange={handleChange} placeholder="Task Name" className="w-full p-2 border rounded-md" required />
            <select
              name="assigned_to"
              value={task.assigned_to}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
            <input type="text" name="priority" value={task.priority} onChange={handleChange} placeholder="Priority (High/Medium/Low)" className="w-full p-2 border rounded-md" required />
            <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded-md" required />
            
            {/* Date Picker for Deadline */}
            <input type="date" name="deadline" value={task.deadline} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            
            <Button type="submit" className="w-full">Submit Task</Button>
          </form>
        )}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-center mb-4">Tasks</h2>
          {tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="shadow-lg rounded-2xl p-6">
                  <h2 className="text-xl font-semibold">{task.name}</h2>
                  <CardContent>
                    <p><strong>Assigned To:</strong> {getEmployeeName(task.assigned_to)}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Deadline:</strong> {new Date(task.deadline).toDateString()}</p>
                    <div className="mt-4">
                      <Progress value={task.progress} className="h-4" />
                      <p className="text-sm text-gray-500 mt-2">{task.progress}% Completed</p>
                    </div>
                    <Button variant="destructive" className="mt-4" onClick={() => handleDelete(task.id)}>Delete</Button>
                  </CardContent>
                </Card>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
