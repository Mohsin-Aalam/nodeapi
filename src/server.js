//initialization 
const express =require('express');
const app = express(); 
const mongoose = require('mongoose');
const note =require('./models/note_modal');

const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//true ->nested objects (correct)
//false -> nested objects (not correct)




mongoose.connect('mongodb+srv://greenstore987:greenstore@cluster0.hdkvf8p.mongodb.net/notesdb')
.then(function(){
//home route (/)
app.get("/", function(req,res){
     const response = {message:"API WORKS!"};
     res.json(response);  
});
app.post("/notes/list", async function(req,res){
    var notes=await note.find({userid:req.body.userid});
    res.json(notes);
    
});
app.post("/notes/add", async function(req,res){
    
       await note.deleteOne({id:req.body.id});
   
    const newNote=new note({
        id:req.body.id,
        userid:req.body.userid,
        title:req.body.title,
        content:req.body.content
    });
   await newNote.save();

   const response={message:"new note created!"+ `id: ${req.body.id}`};
    res.json(response);
    
});

app.post("/notes/delete",async function(req,res){
   await note.deleteOne({id:req.body.id});
   const response={ message:"note deleted !"+`id:${req.body.id}`};
   res.json(response);
});



    console.log("db connected..")
});


//starting the server on the port 
app.listen(5000,function(){
    console.log("server started at port 5000");
});
