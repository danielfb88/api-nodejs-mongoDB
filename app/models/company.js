var mongoose = require('mongoose');

var schema = mongoose.Schema({
    description: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

// should be in plural name
mongoose.model('Companies', schema);
