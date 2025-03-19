import pool from "../config/db.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new task
export const addTask = async (req, res) => {
  const { name, description, assigned_by, assigned_to, document, priority } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (name, description, assigned_by, assigned_to, document, priority, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [name, description, assigned_by, assigned_to, document, priority]
    );
    res.json({ message: "Task created successfully", taskId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, assigned_by, assigned_to, document, priority } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE tasks SET name=?, description=?, assigned_by=?, assigned_to=?, document=?, priority=?, updated_at=NOW() WHERE id=?",
      [name, description, assigned_by, assigned_to, document, priority, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id=?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
