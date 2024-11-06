const connection = require('./express');
// create table
const createTableQuery = `CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100),
email_address VARCHAR(100),
password VARCHAR(15)
)`;

connection.query(createTableQuery,(err,results)=>{
    if (err) throw err;
    console.log('Table created',results);
});

// insert data
const insertQuery = `INSERT INTO users(username,email) VALUES ('John Doe','john@example.com')`;

connection.query(insertQuery,(err,results)=>{
    if (err) throw err;
    console.log('Data inserted:',results);
});

// fetch data
const selectQuery = `SELECT * FROM users`;

connection.query(selectQuery,(err,results)=>{
    if (err) throw err;
    console.log('Data fetched:',results);
});

// update data
const updateQuery = `UPDATE users SET email_address = 'john.doe@example.com' WHERE name = 'John Doe'`;

connection.query(updateQuery,(err,results)=>{
    if (err) throw err;
    console.log('Data updated:',results);
});


// delete data
const deleteQuery =  `DELETE FROM users WHERE username = 'John Doe'`;

connection.query(deleteQuery,(err,results)=>{
    if (err) throw err;
    console.log('Data deleted:',results);
});

connection.end((err)=>{
    if (err){
        console.error('Error ending the database connection:',err.stack);
        return;
    }
    console.log('Database connection closed')
})