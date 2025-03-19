import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [openTask, setOpenTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const user_id = JSON.parse(localStorage.getItem("user")).id;
      const response = await fetch("http://localhost:5000/api/tasks");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      const datafilter = data.filter((d) => d.assigned_to == user_id)
      setTasks(datafilter);
    } catch (error) {
      console.log(error);
      
      console.error("Error fetching tasks:", error);
    }
  };

  const toggleTask = (id) => {
    setOpenTask(openTask === id ? null : id);
  };

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: "In Progress", progress: 10 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTasks();
    } catch (error) {
      console.error("Error accepting task:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchTasks();
    } catch (error) {
      console.error("Error declining task:", error);
    }
  };

  const handleViewSubModules = (task) => {
    navigate(`/sub-module/${task.id}`, { state: { taskName: task.name } });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Assigned Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-all">
            <CardContent>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">{task.name}</h3>
                <Button className="bg-gray-200 p-2 rounded-full" onClick={() => toggleTask(task.id)}>
                  {openTask === task.id ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
              {openTask === task.id && (
                <div className="mt-4 text-gray-700">
                  <p><strong>Assigned By:</strong> {task.assigned_by}</p>
                  <p><strong>Priority:</strong> <span className={`px-2 py-1 rounded text-white ${task.priority === "High" ? "bg-red-500" : task.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}>{task.priority}</span></p>
                  <p className="mt-2">{task.description}</p>
                  <p><strong>Deadline:</strong> {new Date(task.deadline).toDateString()}</p>
                  <div className="mt-4">
                    <Progress value={task.progress} className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${task.progress === 100 ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${task.progress}%` }}></div>
                    </Progress>
                    <p className="text-sm mt-1 text-gray-600">Progress: {task.progress}%</p>
                  </div>
                  <div className="mt-4">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all" onClick={() => handleViewSubModules(task)}>View Sub-Modules</Button>
                  </div>
                </div>
              )}
              {task.status === "Pending" && (
                <div className="mt-4 flex gap-3">
                  <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all" onClick={() => handleAccept(task.id)}>Accept</Button>
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all" onClick={() => handleDecline(task.id)}>Decline</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignedTasks;