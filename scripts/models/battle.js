// app/models/battle.js

// MONGOOSE QUICKSTARTER GUIDE
// http://mongoosejs.com/docs/index.html

// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// IN MONGOOSE EVERYTHING DERIVES FROM SCHEMAS
// define the schema for our battle model
var battleSchema = mongoose.Schema({
	title : String,
	Description : String,
	streams : [{
		trackedWords : [String]
	}],
	startDate : Date,
	endDate : Date,
	id : String

});

// methods ======================
// example
// battleSchema.methods.generateHash = function(password) {
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };


// COMPILE THE SCHEMA INTO A MODEL
// create the model for users and expose it to our app
module.exports = mongoose.model('Battle', battleSchema);
// A model is a class with which we construct documents.
// later, Documents are instances of the model

