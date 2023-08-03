"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Note = require('../models/Note');
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Note.find().exec();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ 'message': 'No data found' });
    }
});
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield Note.findById(id).exec();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ 'message': `Note not found: ${error.message}` });
    }
});
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    const createdAt = new Date().now();
    try {
        const result = yield Note.create({ title: title, content: content, createdAt: createdAt });
        res.status(200).json({ 'message': `New note ${title} created` });
    }
    catch (error) {
        res.status(500).json({ 'message': `Note not created: ${error.message}` });
    }
});
const deleteNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield Note.findByIdAndDelete(id).exec();
        res.status(200).json({ 'message': `Note ${id} deleted!` });
    }
    catch (error) {
        res.status(500).json({ 'message': `Note not deleted: ${error.message}` });
    }
});
module.exports = {
    getNotes,
    getNoteById,
    createNote,
    deleteNoteById
};
