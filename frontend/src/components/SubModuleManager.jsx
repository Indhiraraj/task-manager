import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlusCircle, Trash } from "lucide-react";
import { Progress } from "./ui/progress";
import { useParams } from "react-router-dom";

export default function SubModuleManager() {
  const { taskId } = useParams();
  const [subModules, setSubModules] = useState([]);
  const [newSubModule, setNewSubModule] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    fetchTaskName();
    fetchSubModules();
  }, []);

  const fetchTaskName = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      
      setTaskName(data[0].name);
    } catch (error) {
      console.error("Error fetching task name:", error);
    }
  };

  const fetchSubModules = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/sub-modules/${taskId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubModules(data);
      updateProgress(data);
    } catch (error) {
      console.error("Error fetching sub-modules:", error);
    }
  };

  const updateProgress = async (updatedSubModules) => {
    const completed = updatedSubModules.filter((sub) => sub.completed).length;
    setCompletedCount(completed);
    const progress = updatedSubModules.length > 0 ? (completed / updatedSubModules.length) * 100 : 0;
    setProgressPercentage(progress);
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/progress`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating task progress:", error);
    }
  };

  const addSubModule = async () => {
    if (newSubModule.trim() === "") return;
    try {
      const response = await fetch('http://localhost:5000/api/sub-modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task_id: taskId, name: newSubModule, completed: false }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const updatedSubModules = [...subModules, data];
      setSubModules(updatedSubModules);
      updateProgress(updatedSubModules);
      setNewSubModule("");
    } catch (error) {
      console.error("Error adding sub-module:", error);
    }
  };

  const deleteSubModule = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sub-modules/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedSubModules = subModules.filter((sub) => sub.id !== id);
      setSubModules(updatedSubModules);
      updateProgress(updatedSubModules);
    } catch (error) {
      console.error("Error deleting sub-module:", error);
    }
  };

  const toggleCompletion = async (id) => {
    try {
      const subModule = subModules.find((sub) => sub.id === id);
      const response = await fetch(`http://localhost:5000/api/sub-modules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !subModule.completed }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const updatedSubModules = subModules.map((sub) =>
        sub.id === id ? data : sub
      );
      setSubModules(updatedSubModules);
      updateProgress(updatedSubModules);
    } catch (error) {
      console.error("Error updating sub-module:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Task: {taskName}</h2>
      <div className="mb-4">
        <Progress value={progressPercentage} className="w-full h-4 bg-gray-200 rounded-full" />
        <p className="text-center text-sm text-gray-600 mt-2">{progressPercentage.toFixed(2)}% Completed</p>
      </div>
      <div className="flex gap-2 mb-4">
        <Input
          value={newSubModule}
          onChange={(e) => setNewSubModule(e.target.value)}
          placeholder="Enter sub-module name"
          className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={addSubModule} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <PlusCircle className="w-5 h-5 mr-2" /> Add
        </Button>
      </div>
      <CardContent>
        {subModules.length === 0 ? (
          <p className="text-gray-500 text-center">No sub-modules added yet.</p>
        ) : (
          <ul className="space-y-3">
            {subModules.map((sub) => (
              <li
                key={sub.id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() => toggleCompletion(sub.id)}
                    className="h-5 w-5 text-blue-500 rounded-lg cursor-pointer"
                  />
                  <span className={sub.completed ? "text-gray-400 line-through" : "text-gray-800 font-medium"}>{sub.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSubModule(sub.id)}
                  className="hover:bg-red-100 p-2 rounded-lg"
                >
                  <Trash className="w-5 h-5 text-red-500" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </div>
  );
}