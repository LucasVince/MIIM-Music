const mongoose = require('mongoose');

const instrumentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
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

mondule.exports = instrumentModel;