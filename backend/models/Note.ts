import { ObjectId } from "mongodb";

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
        default: new Date()
    },
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Notes', notesSchema);
