const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expbs = require('express-handlebars');
const UserModel = require('./models/user.js');
const restoModel = require('./models/restaurant.js');

mongoose.connect("mongodb://localhost:27017/ReviewWebsite");

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

app.listen(3000, () => {
	console.log("listening to requests at port", 3000);
});

console.log("listening at port 3000");

app.get('/', async (req,res) => {
	const trending = await restoModel.where().sort({rating: -1}).limit(3).lean();
	let curruser = await UserModel.findById("65e833ffc7b2c99b7605f6ee");
	res.render('index', {title: "Home page", h_user: curruser.getUsername, img_url: curruser.getImage, restaurants: trending});
	console.log(trending);
});
