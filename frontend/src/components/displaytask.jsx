import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

const tasks = [
  { name: "Website Redesign", assignedTo: "John Doe", description: "Redesign the company website to improve user experience and responsiveness.", status: "In Progress", progress: 60 },
  { name: "Mobile App Development", assignedTo: "Jane Smith", description: "Develop a new mobile application for e-commerce.", status: "Pending", progress: 30 },
  { name: "Database Optimization", assignedTo: "Alex Johnson", description: "Improve database performance and scalability.", status: "Completed", progress: 100 },
  { name: "Cloud Migration", assignedTo: "Emily Davis", description: "Migrate on-premise infrastructure to cloud.", status: "Completed", progress: 100 }
];

export default function TaskDetail() {
  const [comments, setComments] = useState({});

  const handleCommentChange = (taskName, value) => {
    setComments({ ...comments, [taskName]: value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <Card key={index} className="shadow-lg rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">{task.name}</h2>
            <CardContent>
              <p className="text-gray-600 mb-2"><strong>Assigned To:</strong> {task.assignedTo}</p>
              <p className="text-gray-600 mb-2"><strong>Description:</strong> {task.description}</p>
              <p className="text-gray-600 mb-2"><strong>Status:</strong> {task.status}</p>
              <div className="mt-4">
                <Progress value={task.progress} className="h-4" />
                <p className="text-sm text-gray-500 mt-2">{task.progress}% Completed</p>
              </div>
              {task.status === "Completed" && (
                <div className="mt-4 space-y-2">
                  <Textarea
                    placeholder="Add comments"
                    value={comments[task.name] || ""}
                    onChange={(e) => handleCommentChange(task.name, e.target.value)}
                  />
                  <div className="flex gap-4">
                    <Button variant="success">Approve</Button>
                    <Button variant="destructive">Not Approve</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  );
}
