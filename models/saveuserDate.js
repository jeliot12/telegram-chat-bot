const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saveDate = new Schema({
	id: {
		type: Number,
	},
	username: {
		type: String,
	},
});

const Users = mongoose.model('Users', saveDate);

module.exports = Users;
