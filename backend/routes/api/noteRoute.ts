const express = require("express");
const router = express.Router();
import { getNotes, getNoteById, getNotesByUser, createNote, updateNote, deleteNoteById } from '../../controllers/noteController';

router.get('/notes', getNotes);

router.get('/note/:id/', getNoteById);

router.post('/notes', createNote);

router.put('/note/:id', updateNote);

router.delete('/note/:id', deleteNoteById);

router.get('/notes/user', getNotesByUser);

module.exports = router;

