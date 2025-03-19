import { useState } from "react";

export default function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    name: "",
    collaborator: "",
    deadline: "",
    description: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleFileChange = (e) => {
    setTask({ ...task, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, task]);
    setIsFormOpen(false);
    setTask({ name: "", collaborator: "", deadline: "", description: "", attachment: null });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isFormOpen ? "Close Form" : "Add Task"}
          </button>
        </div>
        
        {isFormOpen && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Task Name:</label>
              <input type="text" name="name" value={task.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>

            <div>
              <label className="block font-medium">collaborator:</label>
              <input type="text" name="collaborator" value={task.collaborator} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>

            <div>
              <label className="block font-medium">Deadline:</label>
              <input type="date" name="deadline" value={task.deadline} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>

            <div>
              <label className="block font-medium">Description:</label>
              <textarea name="description" value={task.description} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>

            <div>
              <label className="block font-medium">Reference Document:</label>
              <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition">
                Submit Task
              </button>
            </div>
          </form>
        )}

        {/* Display Added Tasks */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-center mb-4">Added Tasks</h2>
          {tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((task, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                  <h3 className="font-bold">{task.name}</h3>
                  <p><strong>collaborator:</strong> {task.collaborator}</p>
                  <p><strong>Deadline:</strong> {task.deadline}</p>
                  <p><strong>Description:</strong> {task.description}</p>
                </li>
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
