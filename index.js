var db = require('./database.js')
const exp = require("express");
const app =  exp();
const port = 3000;
var cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/",(req , res)=>{
    res.json("{'message':'API Node JS Assignment'}");
});
// other path
app.get('/du_an',function(req , res , next){
    let sql = `SELECT id , ten_du_an , ngay_start , tien , leader , thanh_vien
    FROM du_an ORDER BY ngay_start desc`;
    db.query(sql , function(err,data){
        if(err) res.json({'message':err});
        else res.json(data);
    });
});

app.get('/du_an/:id',function(req , res , next){
    let id = req.params.id;
    if (isNaN(id)==true) 
        return res.json({'message':'Dự án không tồn tại'});
    let sql = `SELECT id , ten_du_an , ngay_start , tien , leader , thanh_vien
    FROM du_an WHERE id=? ORDER BY ngay_start desc`;
    db.query(sql , id , function(err, data){
        if (err) res.json({'message':err});
        else if (data.length==0)res.json({'message':'Dự án không có'})
            else res.json(data[0]);
    });
});

app.post('/du_an',(req,res)=>{
    let data = req.body;
    let  sql = "INSERT INTO du_an SET ? " ;
    db.query(sql,data ,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã chèn dự án thành công`});
    });
});
app.put('/du_an/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let  sql = " UPDATE du_an SET ? WHERE id=?" ;
    db.query(sql,[data,id],(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã cập nhật dự án thành công`});
    });
});
app.delete('/du_an/:id',(req,res)=>{
    let id = req.params.id;
    let  sql = " DELETE FROM du_an WHERE id=?" ;
    db.query(sql,id,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã xóa dự án thành công`});
    });
});

app.get('/nhan_vien',function(req , res , next){
    let sql = `SELECT id , ho , ten , ngay_sinh , phai , khu_vuc FROM nhan_vien`;
    db.query(sql , function(err , data){
        if (err) res.json({'message':err});
        else res.json(data);
    });
});

app.get('/nhan_vien/:id',function(req , res , next){
    let id = req.params.id;
    if(isNaN(id)==true)
        return res.json({'message':'Nhân viên không tồn tại'});
    let sql = `SELECT id , ho , ten , ngay_sinh , phai , khu_vuc
    FROM nhan_vien WHERE id=?`;
    db.query(sql , id , function(err,data){
        if(err) res.json({'message':err});
        else if (data.length==0) res.json({'message':'Nhân viên không có'})
            return res.json(data[0]);
    });
});

app.post('/nhan_vien',(req,res)=>{
    let data = req.body;
    let  sql = "INSERT INTO nhan_vien SET ? " ;
    db.query(sql,data ,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã thêm nhân viên thành công`});
    });
});
app.put('/nhan_vien/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let  sql = " UPDATE nhan_vien SET ? WHERE id=?" ;
    db.query(sql,[data,id],(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã cập nhật nhân viên thành công`});
    });
});
app.delete('/nhan_vien/:id',(req,res)=>{
    let id = req.params.id;
    let  sql = " DELETE FROM nhan_vien WHERE id=?" ;
    db.query(sql,id,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã xóa nhân viên thành công`});
    });
});

app.get('/task',function(req , res , next){
    let sql = `SELECT id , ten_task , du_an_id , nhan_vien_id , mo_ta , status , priority
    FROM task`;
    db.query(sql,function(err, data){
        if (err) res.json({'message':err});
        else res.json(data);
    });
});

app.get('/task/:id',function(req , res){
    let id = req.params.id;
    if(isNaN(id)==true)
        return res.json({'message':'Task không tồn tại'});
    let sql = `SELECT id , ten_task , du_an_id ,  nhan_vien_id , mo_ta , status , priority
    FROM task WHERE id=?`;
    db.query(sql, id, function(err,data){
        if (err) res.json({'message':err});
        else if (data.length==0) res.json({'message':'Task không có'})
            else res.json(data[0]);
    })
});

app.post('/task',(req,res)=>{
    let data = req.body;
    let  sql = "INSERT INTO task SET ? " ;
    db.query(sql,data ,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã chèn task thành công`});
    });
});
app.put('/task/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    let  sql = " UPDATE task SET ? WHERE id=?" ;
    db.query(sql,[data,id],(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã cập nhật task thành công`});
    });
});
app.delete('/task/:id',(req,res)=>{
    let id = req.params.id;
    let  sql = " DELETE FROM task WHERE id=?" ;
    db.query(sql,id,(err,d)=>{
        if(err) res.json({'lỗi':err});
        else res.json({'thông báo':`đã xóa task thành công`});
    });
});

app.listen(port,()=>{
    console.log(`Ứng dụng đang chạy với port ${port}`);
});
