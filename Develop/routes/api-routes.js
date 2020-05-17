var fs = require("fs");
const path = require("path");
// const DBpath =  require("../db/db.json");

const dbManager = ( 
       function(path){
            console.log("The function which initializes dbManager has run.");
        
            let notesDB = [];
            fs.readFile((__dirname, "./develop/db/db.json"), 'utf8',  (err, fileContents) => {
                if (err) {
                    console.log("File read failed:", err)
                    return;
                }
                notesDB = fileContents;
               console.log(notesDB);
            });
            console.log(notesDB);


            function add(note){

                return note;
            };
            function remove(note){
                console.log(path);
                return note;
            }
            return {
                "addNote": add,
                "deleteNote": remove
            };
        }(path)
);

module.exports = function (app) {

    app.post("/api/note", function (request, response) {
        
        const thenote = request.body;

        const note = dbManager.addNote(thenote);

        return response.json(note); 

    });
    
    // app.get("/api/notes", function (request, response){
    //     console.log(`/api/notes called`);
    //     response.json(notes); 
    // }); 

    // app.get("/api/notes/:id", function (request, response) {
    //     console.log(`api/notes/:id${request.params.id} called`);

    //     let noteId = request.params.id;

    //     for (let i = 0; i < notes.length; i ++) {
    //         if (notes[i].id === notesId) {
    //             console.log(notes[i]);

    //             return response.json(notes[i]);
    //         }

    //         return response.json(false); 
    //     }
    // });

    // app.post("/api/notes", function (request, response) {
    //     console.log(`POST /api/notes called`); 

    //     const newNote = request.body;
    //    newNote.id = (request.body.name.split (""))[0].toLowerCase(); 
    
    //     console.log(newNote); 

    //     notes.push(newNote); 

    //     response.json(newNote); 
    // }); 
    
    //To DO: add DELETE, 
};