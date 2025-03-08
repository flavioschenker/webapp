const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./mydb.sqlite', (err) => {
    if (err) {
      console.error('Error opening SQLite database:', err.message);
    } else {
      console.log('Connected to SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        age INTEGER
    )`);
});


app.get('/', (req, res) => {
  res.send('Hello from Node.js, Express and SQLite!');
});


// Fetch all users
app.get('/users', async (req, res) => {
    console.log('Fetch all users');
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error fetching users');
        } else {
            res.json(rows);
        }
    });
});

// Create a user
app.post('/user', (req, res) => {
    const { firstName, lastName } = req.body;
    console.log('Create new user:', firstName, lastName);
    db.run(
        'INSERT INTO users (firstName, lastName) VALUES (?, ?)',
        [firstName, lastName],
        err => {
            if (err) {
                return res.status(500).json({ message: 'Error inserting user' });
            }
            res.status(201).json({
                id: this.lastID,
                firstName,
                lastName,
            });
        }
    );
});


// Edit a user
app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    console.log('Edit user with id:', id);
    db.run(
        'UPDATE users SET firstName = ?, lastName = ? WHERE id = ?',
        [firstName, lastName, id],
        err => {
            if (err) {
                return res.status(500).json({ message: 'Error updating user' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'User not found' });
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
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    console.log('Deleting user with id:', id);
    db.run(
        'DELETE FROM users WHERE id = ?',
        [id],
        err => {
            if (err) {
            return res.status(500).json({ message: 'Error deleting user' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        }
    );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
