const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const id = req.params.Id;

    // cause of an SQL injection:
    // const sql = `select * from customers where customer_id = '${id}'`;

    const sql = 'select * from question where questionBankId = ?';
    const conn = mysql.createConnection(mysqlCfg);
    conn.query(sql, id, (err, result) => {
        resp.send(result);

        // delayed response (deliberate)
        // setTimeout(() => resp.send(result[0]), 2000);
    });
    conn.end();
};