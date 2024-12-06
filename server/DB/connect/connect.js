const mongoose = require('mongoose');

const connect = async () => {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@giim-music.ajbut.mongodb.net/?retryWrites=true&w=majority&appName=GIIM-Music`);
        console.log('connection to the server done successfully');
    } catch (err) {
        console.error(err);
    }
}

module.exports = connect;