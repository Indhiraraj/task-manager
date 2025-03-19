import pool from "../config/db.js";

// Get all statuses
export const getStatuses = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM status");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new status
export const addStatus = async (req, res) => {
  const { task_id, status } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO status (task_id, status, updated_at) VALUES (?, ?, NOW())",
      [task_id, status]
    );
    res.json({ message: "Status added successfully", statusId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a status
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE status SET status=?, updated_at=NOW() WHERE id=?",
      [status, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Status not found" });
    res.json({ message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a status
export const deleteStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM status WHERE id=?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Status not found" });
    res.json({ message: "Status deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
