const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./mydb.sqlite", (err) => {
  if (err) {
    console.error("Error opening SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        gender TEXT NOT NULL,
        moode TEXT NOT NULL,
        age INTEGER
    )`);
});

app.get("/", (req, res) => {
  res.send("Hello from Node.js, Express and SQLite!");
});

// Fetch all users
app.get("/users", async (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).send("Error fetching users");
    } else {
      console.log("Fetch all users", rows.length);
      res.json(rows);
    }
  });
});

// Create a user
app.post("/user", (req, res) => {
  const { firstName, lastName, gender, moode } = req.body;
  db.run(
    "INSERT INTO users (firstName, lastName, gender, moode) VALUES (?, ?, ?, ?)",
    [firstName, lastName, gender, moode],
    (err) => {
      if (err) {
        console.log("Error inserting user:", err.message);

        return res.status(500).json({ message: "Error inserting user" });
      }
      console.log("Create new user:", req.body);
      res.status(201).json({
        id: this.lastID,
        firstName,
        lastName,
        gender,
        moode,
      });
    }
  );
});

// Edit a user
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, gender, moode } = req.body;
  console.log("Edit user with id:", id);
  db.run(
    "UPDATE users SET firstName = ?, lastName = ?, gender = ?, moode = ? WHERE id = ?",
    [firstName, lastName, gender, moode, id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating user" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        id,
        firstName,
        lastName,
      });
    }
  );
});

// Delete a user
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log("Deleting user with id:", id);
  db.run("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting user" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
