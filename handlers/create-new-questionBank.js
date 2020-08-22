const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const conn = mysql.createConnection(mysqlCfg);

    // perform validation before query
    const requiredFields = ['name', 'userId'];

    const missingFields = [];

    requiredFields.forEach((field) => {
        if (field in req.body === false) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        resp.status(400);
        resp.json({ missingFields });
        return;
    }

    conn.query(
        'insert into questionBank set ?',
        req.body,
        (err) => {
            if (err) throw err; // results in HTTP response code 500
            resp.send({
                "code":200,
                "success":"questionBank created sucessfully",
                "req.body":req.body
                  });
            resp.end(); // ends the response, and sends HTTP response code 200 with out any content
        });
};