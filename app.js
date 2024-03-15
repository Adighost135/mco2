const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expbs = require('express-handlebars');
const UserModel = require('./models/user');
const restoModel = require('./models/restaurant');
const bodyparser = require('body-parser');

// change all 'clustername' to the name of you cluster with the database collection of ReviewWebsite
// "mongodb+srv://dbAdmin:dALTIIUAe1845fGW@'clustername'.u6ovtf3.mongodb.net/ReviewWebsite?retryWrites=true&w=majority&appName='clustername'";
const DB_URL = "mongodb+srv://dbAdmin:dALTIIUAe1845fGW@restaurant-review.u6ovtf3.mongodb.net/ReviewWebsite?retryWrites=true&w=majority&appName=restaurant-review";

mongoose.connect("mongodb://localhost:27017/ReviewWebsite");

app.use(bodyparser.urlencoded(
    {
        extended: false
    }
));

app.engine('handlebars', expbs.engine({
	defaultLayout: "main",
	helpers: {
		log: function(varToCheck){
			console.log(varToCheck);
		}
	}

}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// async task
mongoose.connect(DB_URL).then((result) => app.listen(3000)).catch((err) => console.log(err));

console.log("listening at port 3000");

app.get('/', async (req,res) => {
	const trending = await restoModel.where().sort({rating: -1}).limit(3).lean();
	let curruser = await UserModel.findById("65e833ffc7b2c99b7605f6ee");
	res.render('index', {title: "Home page", h_user: curruser.getUsername, img_url: curruser.getImage, restaurants: trending});
	console.log(trending);
});

app.get('/login', (req, res) => {
    res.render('login',{ title: "Login Account"});
});

// this part will check if the given login credetnials is valid assuming that it has the 
// exact record in the database, if so, it will then proceed
// the login process and go to the main page
app.post("/login", bodyparser.json(), async (req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username, password: req.body.password});
        console.log(user);
        if (user) {  
            console.log('logged in successfully');
            res.redirect("/index"); // this part will redirect the user to the main page
        } else {
            console.log('did not login successfully');
            res.render("login", { title: "Login Account", error: "Invalid username or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});
