"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
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
        type: mongodb_1.ObjectId,
        ref: 'User'
    }
});
module.exports = mongoose.model('Notes', notesSchema);
