import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const users = [
  { id: 1, name: "rahul", role: "admin" },
  { id: 2, name: "raj", role: "employee" },
  { id: 3, name: "ram", role: "employee" },
  { id: 4, name: "kabi", role: "employee" },
  { id: 5, name: "anand", role: "employee" },
];

// Default password (hashed)
const defaultPassword = "password123"; // Change this to any password you prefer

const addPasswordColumnAndUpdateUsers = async () => {
  try {
    const pool = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    // Add 'password' column if it doesn't exist
    await pool.query(`
      ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '';
    `);
    console.log("✅ Password column added!");

    // Hash passwords and update users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      await pool.query(
        `UPDATE users SET password = ? WHERE id = ?`,
        [hashedPassword, user.id]
      );
      console.log(`✅ Password set for ${user.name}`);
    }

    console.log("🎉 All passwords updated successfully!");
    await pool.end();
  } catch (error) {
    console.error("❌ Error updating users:", error);
  }
};

addPasswordColumnAndUpdateUsers();
