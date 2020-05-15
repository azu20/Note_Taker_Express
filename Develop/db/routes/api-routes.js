const data = require("../note-data");

module.exports = function (app) {
    app.get("/api/notes", function (request, response){
        console.log(`/api/notes called`);
        response.json(notes); 
    }); 

    app.get("/api/notes/:id", function (request, response) {
        console.log(`api/notes/:id${request.params.id} called`);

        let noteId = request.params.id;

        for (let i = 0; i < notes.length; i ++) {
            if (notes[i].id === notesId) {
                console.log(notes[i]);

                return response.json(notes[i]);
            }

            return response.json(false); 
        }
    });

    app.post("/api/notes", function (request, response) {
        console.log(`POST /api/notes called`); 

        const newNote = request.body;
       newNote.id = (request.body.name.split (""))[0].toLowerCase(); 
    
        console.log(newNote); 

        characters.push(newNote); 

        response.json(newNote); 
    }); 
    
};