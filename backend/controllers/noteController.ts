const Note = require('../models/Note');

const getNotes = async (req, res) => {
	try {
		const result = await Note.find().exec();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ 'message': 'No data found' });
	}
}

const getNoteById = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await Note.findById(id).exec();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ 'message': `Note not found: ${error.message}` })
	}
}

const createNote = async (req, res) => {
	const { title, content } = req.body;

	const createdAt = new Date();

	try {
		const result = await Note.create({ title: title, content: content, createdAt: createdAt });
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ 'message': `Note not created: ${error.message}` })
	}
}

const updateNote = async (req, res) => {
	const { title, content } = req.body;
	const id = req.params.id;

	if (!title || !content) {
		res.status(404).json({ 'message': `Body parameters missing` })
	} else {
		try {
			const note = await Note.findById(id).exec();
			note.title = title;
			note.content = content;
			const result = await note.save();
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ 'message': `Note not updated: ${error.message}` })
		}
	}
}

const deleteNoteById = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await Note.findByIdAndDelete(id).exec();
		res.status(200).json({ 'message': `Note ${id} deleted!` });
	} catch (error) {
		res.status(500).json({ 'message': `Note not deleted: ${error.message}` });
	}
}

module.exports = {
	getNotes,
	getNoteById,
	createNote,
	updateNote,
	deleteNoteById
}
