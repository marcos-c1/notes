const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,

    }
});

module.exports = mongoose.model('Notes', notesSchema);
