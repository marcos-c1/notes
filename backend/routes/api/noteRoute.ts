const express = require("express");
const router = express.Router();
import { getNotes, getNoteById, createNote, deleteNoteById } from '../../controllers/noteController';

router.get('/notes', getNotes);

router.get('/note/:id/', getNoteById);

router.post('/notes', createNote);

router.delete('/note/:id', deleteNoteById);

module.exports = router;

