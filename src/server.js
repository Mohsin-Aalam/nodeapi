//initialization 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const note = require('./models/note_modal');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//true ->nested objects (correct)
//false -> nested objects (not correct)




mongoose.connect('mongodb+srv://greenstore987:greenstore@cluster0.hdkvf8p.mongodb.net/notesdb')
    .then(function () {

        console.log("db connected..")
    });

app.get("/", function (req, res) {
    try {
        const response = { message: "API WORKS!" };
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message ?? "Something went wrong" })
    }

});

app.get("/notes/list", async function (req, res) {

    try {
        var notes = await note.find({ userid: req.query.userid });

        res.status(200).json({ data: notes });
    } catch (err) {
        res.status(500).json({ message: err.message ?? "Something went wrong" })
    }
   
});

app.post("/notes/add", async function (req, res) {

    try {
        var isNote = await note.findOne({ userid: req.body.userid, id: req.body.id });
        if (isNote) {
            return res.status(403).json({
                message: "already exist"
            })
        }
    
        const newNote = new note({
            id: req.body.id,
            userid: req.body.userid,
            title: req.body.title,
            content: req.body.content
        });
        await newNote.save();
    
        const response = { message: "new note created!" + `id: ${req.body.id}` };
        res.status(201).json(response);
        
    } catch (err) {
        res.status(500).json({ message: err.message ?? "Something went wrong" })
    }

   
});

app.delete("/notes/delete", async function (req, res) {
    try {
        await note.deleteOne({ id: req.body.id });
        const response = { message: "note deleted !" + `id:${req.body.id}` };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message ?? "Something went wrong" })
    }
    
});


//starting the server on the port 
app.listen(5000, function () {
    console.log("server started at port 5000");
});
