//import
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Middleware function to authenticate user
exports.authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided!' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token!' });
    }
};


//user registration function
exports.registerUser = async (request, response) => {
    //fetch data
    const { name, email, password } = request.body;
    try{
        //check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email_address = ?', [email]);
        if(rows.length > 0){
            return response.status(400).json({ message: 'User already exists!'});
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //insert recorde into db table
        await db.execute('INSERT INTO users (username, email_address, password) VALUES (?,?,?)', [
            name,
            email,
            hashedPassword
        ]);
        response.status(201).json({ message: 'User registered successfully!'});
    } catch(error) {
        response.status(500).json({ message: 'An error occured!', error });
    }
}

exports.loginUser = async (request, response) => {
    const { email, password } = request.body;
    try{
        //check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email_address = ?', [email]);
        if(rows.length === 0){
            return response.status(400).json({ message: 'User not found! Please register.'});
        }
        const user = rows[0];

        //compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return response.status(400).json({ message: 'Invalid credentials!' });
        }
        response.status(200).json({ message: 'Login successful!', name: user.name, email : user.email });
    } catch(error) {
        response.status(500).json({ message: 'An error occured!', error });
    }
}