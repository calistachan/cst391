var express = require('express');
const fs = require('fs');
var dbprop = JSON.parse(fs.readFileSync('routes/dbprop.json'));
const uuid = require('uuid')

var router = express.Router();

/* GET users listing. */
router.get('/all', async function(req, res, next) {
    console.log(dbprop.exists);
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })
      
    let sql = `SELECT * FROM Books`;

    const [rows, fields] = await connection.execute(sql);

    for(const i in rows) {
        console.log(rows[i])
    }
    res.send(rows);
});

/* GET users listing. */
router.get('/', async function(req, res, next) {
    console.log(dbprop.exists);
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })

    let sql = `SELECT * FROM Books`;
    
    const [rows, fields] = await connection.execute(sql);

    var result;
    for(const i in rows) {
        if(rows[i].bookId == req.query.id) {
            res.send(rows[i]);
            return;
        }
    }
    res.send(rows);
});

/*Expected body data
	string isbnThirteen 
	string title 
	string author 
	string imgUrl 
*/
router.post('/', async function(req, res, next) {
    console.log(dbprop.exists);
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })

    let sql = `INSERT INTO Books(bookId, isbnThirteen, title, author, imgUrl, checkedOut, checkedOutBy) values (?, ?, ?, ?, ?, ?, ?)`;

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


//Check out
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

//Check out
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
