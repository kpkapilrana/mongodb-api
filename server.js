const express = require('express');
const bodyParser= require('body-parser');
const cors = require("cors");

//Configuring the database
const dbConfig =require('./config/database.config');
const mongoose = require('mongoose');



mongoose.Promise=global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser:true
}).then( () => {
    console.log("Succesfully connected to database");
}).catch( (err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
})

//create express app
const app= express();

//parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:true}));

//parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());
//define a simple route
app.get('/', (req,res) =>{
    res.json({"message":"Welcome to Student App"});
})


//Require Student routes
require('./app/routes/student.routes')(app);
//listen for request

app.listen(3000, () =>{
        console.log("Server is listening on port 3000");
})