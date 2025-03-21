import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const EmployeeTaskChart = () => {
  const [data] = useState([
    { employee: "raj", assigned: 15, complete: 10, incomplete: 5 },
    { employee: "ram", assigned: 20, complete: 12, incomplete: 8 },
    { employee: "kabi", assigned: 18, complete: 14, incomplete: 4 },
    { employee: "anand", assigned: 25, complete: 20, incomplete: 5 }
  ]);

  return (
    <div className="w-full h-106 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Employee Task Status</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="employee" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend wrapperStyle={{ marginTop: 20 }} />
          <Bar dataKey="assigned" fill="#8884d8" name="Assigned Tasks" />
          <Bar dataKey="complete" fill="#82ca9d" name="Completed Tasks" />
          <Bar dataKey="incomplete" fill="#ff7f7f" name="Incomplete Tasks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeTaskChart;
