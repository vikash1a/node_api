const mysql=require('mysql');
const mysqlCfg=require('./mysql-config');

const jwt = require('jsonwebtoken');
const secretKey = require('../secret.key');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var connection = mysql.createConnection(mysqlCfg);

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  // Uncomment below lines for first time to create a table in database
  // var sql = "CREATE TABLE users (email VARCHAR(255), password VARCHAR(255))";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  console.log('connected as id ' + connection.threadId);
});

exports.register = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)

  var users={
      // "id":req.body.id,
      "firstname":req.body.firstname,
      "lastname":req.body.lastname,
      "email":req.body.email,
      "password":encryptedPassword
   }
  //console.log(users);
  connection.query('INSERT INTO user SET ?',users, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred",
        "error" : error
      })
    } else {
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
      }
  });
}

exports.login = async function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  console.log(typeof (email));
  console.log(password);
  connection.query('SELECT * FROM user WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }
    else{
      if(results.length >0){
        console.log(results[0]);
        const comparision = await bcrypt.compare(password, results[0].password)
        const user=results[0];
        if(comparision){
            const payload = {
                sub: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                iat: Date.now()
            };

            const token = jwt.sign(payload, secretKey);
            // res.json({ token });
            res.send({
              "code":200,
              "success":"login sucessfull",
              "token":token,
              "id":user.id
            })
        }
        else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
        });
      }
    }
    });
}