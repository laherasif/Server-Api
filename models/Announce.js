const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnnounceSchema = new Schema({
    Tittle: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Announce = mongoose.model('announces', AnnounceSchema);

module.exports = Announce;