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

	test('create a note', async () => {
		const payload = '{"title": "how to be a dev", "content", "first you have to be consistent on programming..."}'
		const res = await fetch('http://localhost:5000/notes/', 
			{
			method: 'POST',
			body: payload
		})
		expect(res.status).toBe(200);
	});

	
	test('get a note by id', async () => {
		const id = 1;
		const res = await fetch(`http://localhost:5000/note/${id}`, 
			{
			method: 'GET',
		})
		expect(res.status).toBe(200);
	});
})
