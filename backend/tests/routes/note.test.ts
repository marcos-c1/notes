const { getNotes, createNote, getNoteById, deleteNoteById } = require('../../controllers/noteController');
const mongoose = require("mongoose");
require("dotenv").config();

describe('note route testing', () => {
	test('get all notes', async () => {
		await mongoose.connect(process.env.MONGO_URI);
		const res = fetch('localhost:5000/notes/', 'get').then((r) => expect(r).toBe([]));
	});
})
