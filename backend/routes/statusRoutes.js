import express from "express";
import { getStatuses, addStatus, updateStatus, deleteStatus } from "../controllers/statusController.js";

const router = express.Router();

router.get("/", getStatuses);
router.post("/", addStatus);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

export default router;
