var express = require('express');
const fs = require('fs');
var dbprop = JSON.parse(fs.readFileSync('routes/dbprop.json'));

var router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
    console.log(dbprop.exists);
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: dbprop.host,
        user: dbprop.user,
        password: dbprop.password,
        database: dbprop.database
      })
      
    /*connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });*/

    let sql = `SELECT * FROM Users`;
    let sql2 = `INSERT INTO Users(name, accountNumber) Values (?, ?)`;

    const [rows, fields] = await connection.execute(sql);

    const [rows2, fields2] = await connection.execute(sql2, [req.body.name, rows.length + 1])
    res.send(rows);
});

module.exports = router;
