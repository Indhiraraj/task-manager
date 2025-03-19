import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// Login Route (Basic Authentication)
export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Fetch user by name
    const [users] = await pool.query("SELECT * FROM users WHERE name = ?", [name]);
    if (users.length === 0) return res.status(401).json({ message: "User not found" });

    const user = users[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Send basic user info (no token/session)
    res.json({ message: "Login successful", user: { id: user.id, role: user.role, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
