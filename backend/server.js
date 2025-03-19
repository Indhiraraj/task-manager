import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js"
import subModuleRoutes from './routes/subModuleRoutes.js';
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors())

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/login", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/sub-modules", subModuleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
