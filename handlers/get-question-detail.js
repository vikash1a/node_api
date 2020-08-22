const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const conn = mysql.createConnection(mysqlCfg);
    const id = req.params.Id;

    conn.query('select * from question where id = ? ',
    [id],function(err,rows){
        if(err) throw err;
        console.log(id);
        resp.send(rows);
    });
    
    conn.end();
    
};