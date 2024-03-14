const mongoose = require('mongoose');
const databaseURL = "mongodb://localhost:27017/ReviewWebsite"
const options = {useNewUrlParser: true};

mongoose.connect(databaseURL, options);

const restaurantSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	images: {
		type: [String],
		required: true
	},
	location: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	owner: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: "Users"
	},
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Review'
	}],
	rating: {
		type: Number,
		required: true
	}
}, {timestamps: true});

const restoModel = mongoose.model('restaurants', restaurantSchema, "restaurants");

exports.getTop3 = async function(next){
	try{
		const result = restoModel.find({}).sort({rating: -1}).limit(3).exec();
		return result;
	}
	catch (err){
		console.error(err);
	}
};