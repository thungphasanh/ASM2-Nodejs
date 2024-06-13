var mysql = require ('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'quanliduan'
});
db.connect(err=>{
    if(err) throw err;
    console.log('Đã kết nối Database !')
});
module.exports = db;