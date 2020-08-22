const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const conn = mysql.createConnection(mysqlCfg);
    const id = req.params.Id;

    // perform validation before query
    const requiredFields = ['questionText','answer',
        'optoinA','optionB' ,'optionC' ,'optionD' ,'questionPaperId' ,'questionBankId'];
    // const id=req.params.id;
    const missingFields = [];

    requiredFields.forEach((field) => {
        if (field in req.body === false) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 1) {
        resp.status(400);
        resp.json({ missingFields });
        return;
    }

    conn.query(
        'update question set ? where id = ?',
        [req.body,id],
        (err,result) => {
            if (err) throw err; // results in HTTP response code 500
            resp.send({
                "code":200,
                "success":result.affectedRows + " record(s) updated",
                "req.body":req.body
                });
            resp.end(); // ends the response, and sends HTTP response code 200 with out any content
    });
    
    
};