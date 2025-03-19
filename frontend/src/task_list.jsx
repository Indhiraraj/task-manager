import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([
    // New Tasks
     {
      id: 1,
      name: "Fix Backend API Bug",
      description: "Resolve the issue with data inconsistency in API responses.",
      assignedBy: "John Doe",
      assignedTo: "You",
      priority: "High",
      status: "Pending",
      progress: 0,
      deadline: new Date("2025-03-15")
    },
     {
      id: 2,
      name: "Update UI Components",
      description: "Refactor and improve the task management UI.",
      assignedBy: "Jane Smith",
      assignedTo: "You",
      priority: "Medium",
      status: "Pending",
      progress: 0,
      deadline: new Date("2025-03-18")
    },
    
    {
      id: 6,
      name: "Develop AI Chatbot",
      description: "Create a chatbot for customer support using NLP.",
      assignedBy: "Elon Musk",
      assignedTo: "You",
      priority: "High",
      status: "In Progress",
      progress: 70,
      deadline: new Date("2025-04-10")
    },
    {
      id: 5,
      name: "Migrate to Cloud",
      description: "Move the application from on-premise to AWS cloud.",
      assignedBy: "Jeff Bezos",
      assignedTo: "You",
      priority: "Medium",
      status: "In Progress",
      progress: 30,
      deadline: new Date("2025-04-05")
    },
    // Old Tasks
    {
      id: 4,
      name: "Optimize Database Queries",
      description: "Improve SQL queries to reduce response times.",
      assignedBy: "Emily Clark",
      assignedTo: "You",
      priority: "Medium",
      status: "In Progress",
      progress: 30,
      deadline: new Date("2025-03-22")
    },
    {
      id: 3,
      name: "Write Unit Tests",
      description: "Ensure all backend services have at least 80% test coverage.",
      assignedBy: "Michael Lee",
      assignedTo: "You",
      priority: "High",
      status: "In Progress",
      progress: 50,
      deadline: new Date("2025-03-20")
    },
  
   
  ]);
  
  const [openTask, setOpenTask] = useState(null);

  const toggleTask = (id) => {
    setOpenTask(openTask === id ? null : id);
  };

  const handleAccept = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "In Progress", progress: 10 } : task
      )
    );
  };

  const handleDecline = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
                  <p><strong>Assigned By:</strong> {task.assignedBy}</p>
                  <p><strong>Priority:</strong> <span className={`px-2 py-1 rounded text-white ${task.priority === "High" ? "bg-red-500" : task.priority === "Medium" ? "bg-yellow-500" : "bg-green-500"}`}>{task.priority}</span></p>
                  <p className="mt-2">{task.description}</p>
                  <p><strong>Deadline:</strong> {task.deadline.toDateString()}</p>
                  <p className="text-sm text-gray-600"><strong>Time Left:</strong> {formatDistanceToNow(task.deadline, { addSuffix: true })}</p>
                  <div className="mt-4">
                    <Progress value={task.progress} className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${task.progress === 100 ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${task.progress}%` }}></div>
                    </Progress>
                    <p className="text-sm mt-1 text-gray-600">Progress: {task.progress}%</p>
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
