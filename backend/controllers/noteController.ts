const Note = require('../models/Note');

const getNotes = async (req, res) => {
	try {
		const result = await Note.find().exec();
		res.status(200).json(result);
	} catch(error) {
		res.status(500).json({'message': 'No data found'});
	}
}

const getNoteById = async (req, res) => {
	const id = req.params.id;	
	try {
		const result = await Note.findById(id).exec();
		res.status(200).json(result);
	} catch(error) {
		res.status(500).json({'message': `Note not found: ${error.message}`})
	}
}

const createNote = async (req, res) => {
	const { title, content } = req.body; 

	const createdAt = new Date().now();

	try {
		const result = await Note.create({ title: title, content: content, createdAt: createdAt});
		res.status(200).json({'message': `New note ${title} created`});
	} catch(error) {
		res.status(500).json({'message': `Note not created: ${error.message}`})
	}
}

const deleteNoteById = async (req, res) => {
	const id = req.params.id;
	try {
		const result = await Note.findByIdAndDelete(id).exec();
		res.status(200).json({'message': `Note ${id} deleted!`});
	} catch(error) {
		res.status(500).json({'message': `Note not deleted: ${error.message}`});
	}
} 

module.exports = {
	getNotes,
	getNoteById,
	createNote,
	deleteNoteById
}
