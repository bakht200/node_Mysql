const mySql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mysqlconnection = mySql.createConnection({
    host:'localhost',
    user: 'root',
    password:'12345678',
    database:'crudOp',
    multipleStatements:true
});

mysqlconnection.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Db connected Successfully');
    }
})

app.listen(3000,()=>{
console.log('Express server is running');
});


//get route/

app.get('/users',(req,res)=>{
    mysqlconnection.query('Select * from userData', (error,rows,field)=>{
        if(!error){
            res.send(rows);
        }
        else{
            console.log(error)
        }
    })
})


//get route with id/

app.get('/users/:id',(req,res)=>{
    mysqlconnection.query('Select * from userData WHERE id= ?',[req.params.id], (error,rows,field)=>{
        if(!error){
         
            res.send(rows);
         
        }
        else{
            console.log(error);
        }
    })
})


//delete ////
app.delete('/users/:id',(req,res)=>{
    mysqlconnection.query('DELETE from userData WHERE id= ?',[req.params.id], (error,rows,field)=>{
        if(!error){
            res.send("DELETED");
        }
        else{
            console.log(error);
        }
    })
})

///insert data//

app.put('/users',(req,res)=>{

    var sql = "INSERT INTO userData SET ?";
    mysqlconnection.query(sql,req.body,(error,rows,field)=>{
        if(!error){
            res.send(rows);
        }
        else{
            console.log(error);
        }
    })
});

