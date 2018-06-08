var mongoose = require('mongoose');

var schema = mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        required: true,
        trim: true
    },

});

// should be in plural name
mongoose.model('Users', schema);
