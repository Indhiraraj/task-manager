import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trophy } from "lucide-react";

// Sample leaderboard data with correctly calculated points
const leaderboardData = [
  { id: 1, name: "Alice", high: 3, medium: 2, low: 1, points: 3 * 30 + 2 * 20 + 1 * 10 },
  { id: 2, name: "Bob", high: 2, medium: 3, low: 2, points: 2 * 30 + 3 * 20 + 2 * 10 },
  { id: 3, name: "Charlie", high: 3, medium: 1, low: 2, points: 3 * 30 + 1 * 20 + 2 * 10 },
  { id: 4, name: "David", high: 2, medium: 2, low: 2, points: 2 * 30 + 2 * 20 + 2 * 10 },
  { id: 5, name: "Eve", high: 1, medium: 3, low: 3, points: 1 * 30 + 3 * 20 + 3 * 10 },
];

const Leaderboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Leaderboard</h1>
      <Card className="shadow-lg rounded-2xl mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Point Calculation Method</h2>
          <ul className="list-disc pl-6">
            <li><span className="font-bold">30 pts</span> for High Priority Task</li>
            <li><span className="font-bold">20 pts</span> for Medium Priority Task</li>
            <li><span className="font-bold">10 pts</span> for Low Priority Task</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Points</TableHead>
                <TableHead className="text-center">High Priority</TableHead>
                <TableHead className="text-center">Medium Priority</TableHead>
                <TableHead className="text-center">Low Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user, index) => (
                <TableRow key={user.id} className="border-b">
                  <TableCell className="text-center font-bold">
                    {index < 3 ? (
                      <span className="text-yellow-500 flex justify-center">
                        <Trophy className="h-5 w-5" />
                      </span>
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-center font-semibold">{user.points}</TableCell>
                  <TableCell className="text-center">{user.high}</TableCell>
                  <TableCell className="text-center">{user.medium}</TableCell>
                  <TableCell className="text-center">{user.low}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
