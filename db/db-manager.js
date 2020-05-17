var fs = require("fs");
const path = require("path");
const dbFile = "./db/db.json";

module.exports = (function (filePath) {
    //This will be our internal database, which the functions we are
    // exposing through this IIFE will have access to
    let notesDB = Array.from([]);

    fs.readFile((__dirname, filePath), 'utf8', (err, fileContents) => {
        if (err) {
            console.log("File read failed:", err)
            return;
        }
        if(fileContents === ""){
            dumpToFile();
            return notesDB;
        }
        notesDB = JSON.parse(fileContents);
    });

    function dumpToFile() {
        fs.writeFile((__dirname, filePath), JSON.stringify(notesDB), () => {
            console.log("dumped the in-memory DB to the DB file");
        });
    };

    function nextId() {
        let highestCounter = 0;
        for (const n of notesDB) {
            if (n.id > highestCounter) {
                highestCounter = n.id;
            }
        };
        return highestCounter + 1;
    };

    function add(note) {
        //get the next ID
        // set the id in the note to that next id
        note.id = nextId();
        //add the note to the internal DB
        notesDB.push(note);
        dumpToFile();
        return note;
    };

    function remove(noteId) {

        for(let i = 0 ; i < notesDB.length; i++ ){
            if (notesDB[i].id === Number(noteId)){
                notesDB.splice(notesDB[i],1);
                dumpToFile();
                return {"message": "Note deleted"};
            }
        };
        return {"error": "The note with id: " + noteId + " was not found"};
    };

    function getAllNotes() {
        return notesDB;
    };
    function getNote(noteId) {
        for (const n of notesDB) {
            if (n.id === Number(noteId)) {
                return n;
            }
        };
        return { "error": "The note with id: " + noteId + " was not found" };
    };
    return {
        "addNote": add,
        "deleteNote": remove,
        "all": getAllNotes,
        "get": getNote
    };
})(dbFile);