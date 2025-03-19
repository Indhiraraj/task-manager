import express from "express";
import { getTasks, addTask, updateTask, deleteTask, updateTaskProgress, getTask  } from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put('/:id/progress', updateTaskProgress);

export default router;
