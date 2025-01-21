// handling http requests in Node.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
require('dotenv').config({ path: './routes/.env' });


/// middleware to parse JSON data
app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Create connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',        // Default URL for MySQL
    port: 3306,
    user: 'root',             // Your MySQL username
    password: 'Candidcoco@20',     // Your MySQL password
    database: 'telemedicine',      // Your MySQL database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});


// root route
app.get('/register', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/registration.html', (req, res) => {
    res.sendFile(__dirname + '/registration.html');
});

app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/patients', (request, response) => {
    response.sendFile(path.join(__dirname, 'patients.html'));
});
app.get('/doctors', (request, response) => {
    response.sendFile(path.join(__dirname, 'doctors.html'));
});
app.get('/appointments', (request, response) => {
    response.sendFile(path.join(__dirname, 'appointments.html'));
});
app.get('/admin', (request, response) => {
    response.sendFile(path.join(__dirname, 'admin.html'));
});


app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// POST route to handle the form submission
app.post('/registration.html', (req, res) => {
    const formData = req.body; // Retrieve form data
    console.log(formData); // Debug: Print form data
    res.send('Registration successful');
});

app.post('/users',(req,res)=>{
    const {name,email}= req.body; //extract name and email from request body
    const sql = 'INSERT INTO users (username, email_address) VALUES (?, ?)';
    db.query(sql,[name,email],(err,result)=>{
        if (err) {
            return res.status(500).json({error:err.message});
        }
        res.status(201).json({id:result.insertId, name,email});
    });
});


// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, age, gender,email, country,phone_number,password,confirmPassword , message, subscribe } = req.body;

    // Insert data into MySQL
    const query = `INSERT INTO users (username,  age, gender, email_address,country,phone_number, password, confirmPassword, submit) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, age, gender, email, country, phone_number, password, confirmPassword, submit ? 1 : 0], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to insert data' });
            return;
        }
        res.json({ success: 'Data inserted successfully', result });
    });
    
});


app.get("*",(req,res) => res.sendFile(path.join(__dirname,'index.html')))
// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = db;