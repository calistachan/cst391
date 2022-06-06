var express = require('express');
const fs = require('fs');
var dbprop = JSON.parse(fs.readFileSync('routes/dbprop.json'));
const uuid = require('uuid')

var router = express.Router();

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
      
    let sql = `SELECT * FROM Transactions`;

    const [rows, fields] = await connection.execute(sql);

    res.send(rows);
});

module.exports = router;
