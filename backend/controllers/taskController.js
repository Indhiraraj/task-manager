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

export const getTask = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks where id = ?", [req.params.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new task
export const addTask = async (req, res) => {
  const { name, description, assigned_to, document, priority, deadline } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (name, description, assigned_by, assigned_to, document, priority, deadline, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [name, description, 1, assigned_to, document, priority, deadline]
    );

    res.json({ message: "Task created successfully", taskId: result.insertId });
  } catch (error) {
    console.log(error);
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

// Update task progress based on sub-modules
export const updateTaskProgress = async (req, res) => {
  const { id } = req.params;
  try {
      const [subModules] = await pool.query("SELECT * FROM sub_modules WHERE task_id = ?", [id]);
      const completedCount = subModules.filter(sub => sub.completed).length;
      const totalCount = subModules.length;
      const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      const [result] = await pool.query(
          "UPDATE tasks SET progress = ?, updated_at = NOW() WHERE id = ?",
          [progress, id]
      );
      if (result.affectedRows === 0) return res.status(404).json({ message: "Task not found" });
      res.json({ message: "Task progress updated successfully", progress });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
