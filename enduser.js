let express=require('express');
let app=express();
let port=3000;
const cors = require('cors')
app.use(cors());
app.use(express.json());




let mysql = require('mysql')
var connnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"myroot99club",
  database:"expresserver"
});


connnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/getAllUser',(req,res)=>{
  connnection.query("Select id,username,email,message from usersMessage where isActive=1",(error,results)=>{
    if(error) console.log(error);
    console.log( "The solution is :",results)
    res.json(results)
  });
})


app.get('/getUserById/:id',(req,res)=>{
  connnection.query("Select id,username,email,message from usersMessage where id=?",[req.params.id],(error,results)=>{
    if(error) console.log(error);
    console.log( "The solution is :",results)
    res.json(results)
  });
})



app.put('/updateUser/:id',(req,res)=>{
  console.log(req.body);
  connnection.query("update usersMessage set username=?,email=?,message=? where id=?",[req.body.username,req.body.email,req.body.message,req.params.id],(error,results)=>{
    if(error) console.log(error);
    console.log( "The solution is :",results)
    res.json(results)
  });
})



app.post('/postUser',(req,res)=>{
  let createUsers=1;
  console.log(req.body);
  connnection.query("insert into usersMessage (username,email,message,isActive) values (?,?,?,?)",[req.body.username,req.body.email,req.body.message,createUsers], (error,results)=>{
    if(error) console.log(error);
    console.log( "The solution is :",results)
    res.json(results)
  });
})



app.put('/deleteUserById',(req,res)=>{
  connnection.query("update usersMessage set isActive=0 where id=?",[req.body.id], (error,results)=>{
    if(error) console.log(error);
    console.log( "The solution is :",results)
    res.json(results)
  });
})

// app.get('/getUserById/:id/:username',(req,res)=>{
//   connnection.query("Select * from usersMessage where id=? and username=?",[req.params.id,req.params.username],(error,results)=>{
//     if(error) console.log(error);
//     console.log( "The solution is :",results)
//     res.json(results)
//   });
// })



app.listen(port,()=>{
  console.log('server is running');
})

