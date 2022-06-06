var express = require('express');
const fs = require('fs');
var dbprop = JSON.parse(fs.readFileSync('routes/dbprop.json'));
const uuid = require('uuid')

var router = express.Router();

/* GET all books from db. */
router.get('/all', async function(req, res, next) {
    // Setup mysql
    const mysql = require('mysql2/promise');

    // Create a connection to the DB
    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })
      
    // Select all books
    let sql = `SELECT * FROM Books`;

    // Wait for query to finish
    const [rows, fields] = await connection.execute(sql);

    // Respond with query result
    res.send(rows);
});

/* GET a specific book by bookId. */
router.get('/', async function(req, res, next) {
    // Setup mysql
    const mysql = require('mysql2/promise');

    // Create a connection to the DB
    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })

    // Select all books
    let sql = `SELECT * FROM Books`;
    
    const [rows, fields] = await connection.execute(sql);

    var result;

    // Loop through results, return the book with matching id
    for(const i in rows) {
        if(rows[i].bookId == req.query.id) {
            res.send(rows[i]);
            return;
        }
    }

    // Return all if no row found
    res.send(rows);
});

/*
POST Create a new book
Expected body data
	string isbnThirteen 
	string title 
	string author 
	string imgUrl 
*/
router.post('/', async function(req, res, next) {
    // Setup mysql
    const mysql = require('mysql2/promise');

    // Connect to db
    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })

    // Insert statement
    let sql = `INSERT INTO Books(bookId, isbnThirteen, title, author, imgUrl, checkedOut, checkedOutBy) values (?, ?, ?, ?, ?, ?, ?)`;

    // Execute query with POST body data
    const [rows, fields] = await connection.execute(sql, 
        [uuid.v4(), 
        req.body.isbnThirteen, 
        req.body.title, 
        req.body.author,
        req.body.imgUrl,
        false,
        -1]
    );

    res.send("Book added: " + req.body.title);
});

router.delete('/', async function(req, res, next) {
    console.log(dbprop.exists);
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })

    
    let sql = `DELETE FROM Books WHERE bookId = ?`;
    const [rows, fields] = await connection.execute(sql, 
        [req.body.id]
    );

    res.send("Delete book: " + req.body.id);
});


// Set check out to true, checkedOutBy to user account number, 
// and checked out date to the current time
router.post('/checkout', async function(req, res, next) {
    console.log(dbprop.exists);
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })

    let sql = `UPDATE Books SET checkedOutBy = ?, checkedOut = ?, checkedOutDate = ?  where bookId = ?`;

    const [rows, fields] = await connection.execute(sql, 
        [req.body.accountNumber, 
        true, 
        new Date().toISOString().slice(0, 19).replace('T', ' '), 
        req.body.bookId]
    );

    res.send("Book checked out: " + req.body.bookId + ", by: " + req.body.accountNumber);
});

// Return a book and reset checked out factors
router.post('/return', async function(req, res, next) {
    console.log(dbprop.exists);
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })

    let sql = `UPDATE Books SET checkedOutBy = ?, checkedOut = ?, checkedOutDate = ?  where bookId = ?`;

    const [rows, fields] = await connection.execute(sql, 
        [-1, 
        false, 
        null, 
        req.body.bookId]
    );

    res.send("Book returned: " + req.body.bookId + ", by: " + req.body.accountNumber);
});

module.exports = router;
