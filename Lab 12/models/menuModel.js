const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({

	name:{

		type: String,
		required: [true, 'A menu must have a name'],
		unique: true,

	},

	description:{

		type: String,
		required: [true, 'There must be a description'],
		unique: true,

	},

	category:{

		type: String,
		required: [true],

	},

	price:{

		type: Number,
		default: 0,

	},

	priceDiscount:Number,

	image:{

		type: String,
		required: [true, 'There must be an image'],

	},

	rating:{

		type: Number,
		required: [true, 'There must be a rating'],

	},
	
	startDates: [Date]

});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;