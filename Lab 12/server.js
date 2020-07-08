const express = require('express');
const app = express();
const mongoose = require('mongoose');

const routes = require("./app");

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   app.use(routes);
   console.log("Example app listening at http://%s:%s", host, port)
});

const DB = "mongodb+srv://laiba:laiba69@cluster0-g0ej2.mongodb.net/menus?retryWrites=true&w=majority";

mongoose.connect(DB, {
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology:true,
useFindAndModify: false
}).then(() => console.log("Database connection successful!"));