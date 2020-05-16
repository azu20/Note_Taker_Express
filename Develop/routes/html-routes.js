const path = require("path");

module.exports = function (app) {
    app.get("/", function (request, response) {
        console.log(`/ called`);
        response.sendFile(path.join(_direname, "../public/index.html"));
    });

    app.get("/app", function (request, response) {
        response.sendFile(path.join(__dirname, "../public/notes.html"));
    });
}; 