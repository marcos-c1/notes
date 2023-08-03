const { getNotes, createNote, getNoteById, deleteNoteById } = require('../../controllers/noteController');
require("dotenv").config();

describe('note route testing', () => {
	test('get all notes', async () => {
		const res = await fetch('http://localhost:5000/notes/', 
			{
			method: 'GET',
		})
		expect(res.status).toBe(200);
	});
})
