// import packages
const mysql = require('mysql2');
require('dotenv').config({ path: './routes/.env' });
console.log('PORT:', process.env.PORT); // Debugging: Print the PORT value to the console


// createpool creates several connnection to the db server
const pool = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
module.exports = pool.promise();