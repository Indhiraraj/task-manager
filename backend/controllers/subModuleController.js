import pool from '../config/db.js';

// Get sub-modules by task ID
export const getSubModulesByTaskId = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM sub_modules WHERE task_id = ?", [req.params.taskId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new sub-module
export const addSubModule = async (req, res) => {
    const { task_id, name, completed } = req.body;
    try {
        const [result] = await pool.query(
            "INSERT INTO sub_modules (task_id, name, completed, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
            [task_id, name, completed]
        );
        const [subModule] = await pool.query("SELECT * FROM sub_modules WHERE id = ?", [result.insertId]);
        res.json(subModule[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a sub-module
export const updateSubModule = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const [result] = await pool.query(
            "UPDATE sub_modules SET completed = ?, updated_at = NOW() WHERE id = ?",
            [completed, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Sub-module not found" });
        const [subModule] = await pool.query("SELECT * FROM sub_modules WHERE id = ?", [id]);
        res.json(subModule[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a sub-module
export const deleteSubModule = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM sub_modules WHERE id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Sub-module not found" });
        res.json({ message: "Sub-module deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
