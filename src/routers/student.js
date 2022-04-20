const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

/* Create data of registration of student */

// Using Promises.
/*app.post("/students",(req,res)=>{
    console.log(req.body);
    const user = Student(req.body);

    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})*/

// Using Async Await.
router.post("/students",async(req,res)=>{
    try{
        console.log(req.body);
        const user = Student(req.body);

        const createUser = await user.save();
        res.status(201).send(createUser); 
    } catch(e){
        res.status(400).send(e);
    }
})

/* Read data of registered student */
router.get("/students",async(req,res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(e){
        res.send(e);  
    }
})

/* Read individual data */
router.get("/students/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if(!studentData){
           return res.status(404).send();
        }
        else{
           res.send(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

/* update student data by id */
router.patch("/students/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
       const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{
           new:true
       });
        res.send(updateStudent);

    }catch(e){
        res.status(400).send(e);
    }
})

/* delete student data */
router.delete("/students/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
       const deleteStudent = await Student.findByIdAndDelete(_id);

        if(!deleteStudent){
           return res.status(400).send(); 
        }
        else{
            res.send(deleteStudent)
        }

    }catch(e){
        res.status(500).send(e);
    }
})

module.exports=router;
