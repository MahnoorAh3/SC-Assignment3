const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const AppError = require("./utils/appError.js");
const menuRoute = require("./routes/menuRoutes");
const userRoute = require("./routes/userRoutes");
const errorController = require("./controllers/errorController");
var envs = require('envs');

const app = express();


dotenv.config({ path: './config.env' });
if (process.env.NODE_ENV === "development"){
	app.use(morgan('dev'));
}
 
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use((req,res,next)=>{
	console.log('In the middleware.....');
	next();
});
app.use("/api/khaapa/menus",menuRoute);
app.use("/api/khaapa/user", userRoute);


app.all("*", (req, res) => {
	const app = new AppError(`Can not find ${req.originalUrl} on this server`,404);
	app.showerror(req, res);
});

app.use(errorController);

module.exports = app;

