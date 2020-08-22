const mysql=require('mysql');
const mysqlCfg=require('./mysql-config');

module.exports=function(req,resp){
    const page=req.query.page || 1;
    const limit=req.query.limit || 10;
    const skip=(page-1)*limit;

    const userId=req.query.id || 1;

    const conn=mysql.createConnection(mysqlCfg);
    conn.query('select * from questionBank where userId=? limit ? offset ? ',
    [userId,parseInt(limit),skip],function(err,rows){
        if(err) throw err;
        // resp.send(rows);
        conn.query('select count(*) as count from questionBank where userId=?', [userId],
            (err, result)=>{
                if(err) throw err;

                resp.json({
                    data: rows,
                    count: result[0].count
                })

            });
            conn.end();
    });
    
    
}

