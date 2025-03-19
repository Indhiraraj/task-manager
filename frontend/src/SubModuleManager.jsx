import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { PlusCircle, Trash } from "lucide-react";
import { Progress } from "./progress";

export default function SubModuleManager({ task }) {
  const [subModules, setSubModules] = useState([]);
  const [newSubModule, setNewSubModule] = useState("");
  const [completedCount, setCompletedCount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const updateProgress = (updatedSubModules) => {
    const completed = updatedSubModules.filter((sub) => sub.completed).length;
    setCompletedCount(completed);
    const progress = updatedSubModules.length > 0 ? (completed / updatedSubModules.length) * 100 : 0;
    setProgressPercentage(progress);
    console.log("Progress Updated:", progress, "%");
  };

  const addSubModule = () => {
    if (newSubModule.trim() === "") return;
    const updatedSubModules = [...subModules, { id: Date.now(), name: newSubModule, completed: false }];
    setSubModules(updatedSubModules);
    updateProgress(updatedSubModules);
    setNewSubModule("");
  };

  const deleteSubModule = (id) => {
    const updatedSubModules = subModules.filter((sub) => sub.id !== id);
    setSubModules(updatedSubModules);
    updateProgress(updatedSubModules);
  };

  const toggleCompletion = (id) => {
    const updatedSubModules = subModules.map((sub) =>
      sub.id === id ? { ...sub, completed: !sub.completed } : sub
    );
    setSubModules(updatedSubModules);
    updateProgress(updatedSubModules);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Task: {task}</h2>
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
