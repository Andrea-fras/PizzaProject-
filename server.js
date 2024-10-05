const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'andrea',
    password: 'Tynett39',
    database: 'pizzeria'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route to handle registration form submission
app.post('/register', (req, res) => {
    console.log('Received register request:', req.body); // Log the request body

    const { name, address, birthday, phone_number } = req.body;

    const sql = 'INSERT INTO customer (Name, Address, Birthday, Phone_number) VALUES (?, ?, ?, ?)';

    db.query(sql, [name, address, birthday, phone_number], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err); // Log any errors
            res.status(500).json({ message: 'Registration failed', error: err });
            return;
        }
        console.log('Insert successful:', result); // Log the successful insert
        res.json({ message: 'Registration successful!' });
    });
});

// Route to handle login form submission
app.post('/login', (req, res) => {
    console.log('Received login request:', req.body); // Log the request body

    const { name, phone_number } = req.body;

    const sql = 'SELECT * FROM customer WHERE Name = ? AND Phone_number = ?';
    
    db.query(sql, [name, phone_number], (err, results) => {
        if (err) {
            console.error('Error querying database:', err); // Log any errors
            res.status(500).json({ message: 'Login failed', success: false });
            return;
        }

        if (results.length > 0) {
            console.log('Login successful:', results[0]); // Log the successful login
            res.json({ message: 'Login successful!', success: true });
        } else {
            console.log('Login failed: No matching customer found');
            res.json({ message: 'Invalid name or phone number', success: false });
        }
    });
});

app.get('/pizzas', (req, res) => {
    const sql = `
        SELECT pizzas.pizza_id, pizzas.name, pizzas.price, GROUP_CONCAT(ingredients.name SEPARATOR ', ') AS ingredients
        FROM pizzas
        JOIN pizza_ingredients ON pizzas.pizza_id = pizza_ingredients.pizza_id
        JOIN ingredients ON pizza_ingredients.ingredient_id = ingredients.ingredient_id
        GROUP BY pizzas.pizza_id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching pizzas:', err);
            res.status(500).json({ message: 'Failed to fetch pizzas', error: err });
            return;
        }
        res.json(results);
    });
});

app.get('/drinks', (req, res) => {
    const sql = 'SELECT * FROM drinks';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching drinks:', err);
            res.status(500).json({ message: 'Failed to fetch drinks', error: err });
            return;
        }
        res.json(results);
    });
});

app.get('/desserts', (req, res) => {
    const sql = 'SELECT * FROM desserts';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching desserts:', err);
            res.status(500).json({ message: 'Failed to fetch desserts', error: err });
            return;
        }
        res.json(results);
    });
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
