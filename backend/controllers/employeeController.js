import pool from "../config/db.js";

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE role = ?", ["employee"]);
    res.json(rows);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error.message });
  }
};