const express = require('express');
const app = express();
require("./db/conn");
/*const Student = require("./models/students");*/
const studentRouter=require("./routers/student");
app.use(studentRouter);

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`);
})