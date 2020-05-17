const path = require("path");

module.exports = function (app) {
    app.get("/", function (request, response) {
        console.log(`/ called`);
        response.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/notes", function (request, response) {
        response.sendFile(path.join(__dirname, "../public/notes.html"));
    });
}; 