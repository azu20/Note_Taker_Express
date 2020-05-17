var fs = require("fs");
const path = require("path");
const DBpath = "./develop/db/db.json";

const dbManager = (function (filePath) {
    //This will be our internal database, which the functions we are
    // exposing through this IIFE will have access to
    let notesDB = Array.from([]);


    fs.readFile((__dirname, filePath), 'utf8', (err, fileContents) => {
        if (err) {
            console.log("File read failed:", err)
            return;
        }
        notesDB = JSON.parse(fileContents);
    });

    function dumpToFile(){
        fs.writeFile((__dirname, filePath), JSON.stringify(notesDB), () => {
            console.log("dumped the in-memory DB to the DB file");
        });
    };

    function nextId(){
        let highestCounter = 0;
        for(const n of notesDB){
            if (n.id > highestCounter) {
                highestCounter = n.id;
            }
        };
        return highestCounter + 1;
    };

    function add(note) {
        //get the next ID
        // set the id in the note to that next id
        note.id =  nextId();
        //add the note to the internal DB
        notesDB.push(note);
        dumpToFile();
        return note;
    };

    function remove(noteId) {
        for(let i = 0 ; i < notesDB.length; i++ ){
            console.log(notesDB[i]);
            if (notesDB[i].id === Number(noteId)){
                notesDB.splice(notesDB[i],i);
                dumpToFile();
                return {"message": "Note deleted"};
            }
        };
        return {"error": "The note with id: " + noteId + " was not found"};
    };

    function getAllNotes(){
        return notesDB;
    };
    function getNote(noteId){
        for(const n of notesDB){
            if (n.id === Number(noteId)){
                return n;
            }
        };
        return {"error": "The note with id: " + noteId + " was not found"};
    };
    return {
        "addNote": add,
        "deleteNote": remove,
        "all": getAllNotes,
        "get": getNote
    };
})(DBpath);

module.exports = function (app) {

    app.post("/api/notes", function (request, response) {

        const thenote = request.body;

        const note = dbManager.addNote(thenote);

        return response.json(note);

    });

    app.get("/api/notes", function (request, response) {
        response.json(dbManager.all());
    });

    app.get("/api/notes/:id", function (request, response) {

        let noteId = request.params.id;
        
        return response.json(dbManager.get(noteId)); 
        
    });

    app.delete("/api/notes/:id", function (request, response) {

        let noteId = request.params.id;
        
        return response.json(dbManager.deleteNote(noteId)); 
        
    }); 
};