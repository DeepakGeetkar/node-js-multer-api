const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const multer = require('multer');
const app =express();


const fileStrogeEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images');
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now() + " -- " + file.originalname);
    },
});
const upload= multer({storage:fileStrogeEngine});

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.post('/single',upload.single('images') ,(req,res)=>{
    console.log(req.file);
    res.send("file UPLODED");
})

app.post('/multiple',upload.array('images',5) ,(req,res)=>{
    console.log(req.files);
    res.send("file UPLODED & SAVE");
})




app.listen(7000);