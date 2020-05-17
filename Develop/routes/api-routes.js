const dbManager = require("../db/db-manager");


module.exports = function (app) {
    app.get("/api/notes", function (request, response) {
        response.json(dbManager.all());
    });

    app.get("/api/notes/:id", function (request, response) {
        let noteId = request.params.id;
        return response.json(dbManager.get(noteId));
    });

    app.post("/api/notes", function (request, response) {

        const thenote = request.body;
        const note = dbManager.addNote(thenote);
        return response.json(note);
    });

    app.delete("/api/notes/:id", function (request, response) {

        let noteId = request.params.id;
        return response.json(dbManager.deleteNote(noteId));

    });
};