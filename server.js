
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Use your database username
    password: 'Java@8828',  // Use your database password
    database: 'unicron1' // Use your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Define a route to search for an ID
app.get('/search', (req, res) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).send('ID is required');
    }

    const query = 'SELECT * FROM gem_certificates WHERE certificate_id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Error executing query');
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

