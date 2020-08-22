const mysql = require('mysql');
const mysqlCfg = require('./mysql-config');

module.exports = (req, resp) => {
    const conn = mysql.createConnection(mysqlCfg);
    const id = req.params.Id;

    conn.query('delete from question where id = ? ',
    [id],function(err){
        if(err) throw err;
        // console.log(id);
        // resp.send('Item deleted');
        resp.end();
    });
    
    conn.end();
    
};