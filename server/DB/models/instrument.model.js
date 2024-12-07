const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    added_at: {
        type: Date,
        default: Date.now
    }
});

const instrumentModel = mongoose.model('Instrument', instrumentSchema);

module.exports = instrumentModel;