const mysql=require('mysql');
const mysqlCfg=require('./mysql-config');

module.exports=function(req,resp){
    const page=req.query.page || 1;
    const limit=req.query.limit || 10;
    const skip=(page-1)*limit;
    const questionBank=req.query.questionBank || 1;

    const conn=mysql.createConnection(mysqlCfg);
    conn.query('select * from question where questionBankId = ?  limit ? offset ? ',
    [questionBank,parseInt(limit),skip],function(err,rows){
        if(err) throw err;
        resp.send(rows);
    });
    
    conn.end();
}