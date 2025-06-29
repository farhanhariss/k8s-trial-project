const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3000;

const pool = new Pool({
  user: "userku",
  host: "postgres-service",
  database: "pesandb",
  password: "passku",
  port: 5432,
});

app.get("/api/message", async (req, res) => {
  await pool.query("CREATE TABLE IF NOT EXISTS messages (text VARCHAR(255))");
  await pool.query(
    "INSERT INTO messages (text) VALUES ('Hello from PostgreSQL!')"
  );
  const result = await pool.query(
    "SELECT * FROM messages ORDER BY text DESC LIMIT 1"
  );
  res.json({ message: result.rows[0].text });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
