require('dotenv').config();
const express=require('express');
const database = require('./configs/db');
const userRouter = require('./router/userRouter');
const auth = require('./middleware/auth');

const app=express();
app.use(express.json());
app.use(userRouter)
const port=process.env.port;

app.get('/',auth,(req,res)=>{
    res.send('Hello World');
});
app.listen(port, ()=>{
    database.connect((err)=>{
        if(err){
            console.log(err);
        }else{
            console.log(`sucessfully connected to database`);
        }
    });

    console.log(`listening on port ${port}`);
})
