const express = require("express"); 
const htmlRoutes = require("./Develop/db/routes/html-routes");
const apiRoutes = require("./Develop/db/routes/api-routes");

const app = express(); 
const port = process.env.PORT || 3000; 

//used to convert/read data as json
app.use(express.json()); 
//used to read arrays/strings from the FROM POSTS. 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public")); 

//need to import the API and HTML routes 
htmlRoutes(app); 
apiRoutes(app); 

app.listen(PORT, function () {

    console.log(`app listening on PORT : ${PORT}`); 
}); 