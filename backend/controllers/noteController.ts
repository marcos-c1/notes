const Note = require('../models/Note');
const User = require('../models/User');

const getNotes = async (req, res) => {
	try {
		const result = await Note.find().exec();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ 'message': 'No data found' });
	}
}

const getNotesByUser = async (req, res) => {
	const cookies = req.cookies

	if (!cookies?.jwt) {
		res.status(401).json({ 'message': 'JWT not found' });
	} else {
		try {
			const refreshToken = cookies.jwt;

			const user = await User.findOne({ refreshToken: refreshToken }, { refreshToken: { $elemMatch: { refreshToken: String } } }).exec();
			const result = await Note.find({ user: user._id }).exec();
			res.status(200).json(result)
		} catch (error) {
			res.status(500).json({ 'message': `${error.message}` });
		}
	}

}

const getNoteById = async (req, res) => {
	const id = req.params.id;
	console.log(id)
	try {
		const result = await Note.findById(id).exec();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ 'message': `Note not found: ${error.message}` })
	}
}

const createNote = async (req, res) => {
	const cookies = req.cookies
	const refreshToken = cookies.jwt;
	const { title, content } = req.body;

	const createdAt = new Date();

	try {
		const userById = await User.findOne({ refreshToken: refreshToken }).exec();
		const note = await Note.create({ title: title, content: content, createdAt: createdAt, user: userById._id });

		userById.notes.push(note);
		await userById.save();

		res.status(200).json(note);
	} catch (error) {
		res.status(500).json({ 'message': `Note not created: ${error.message}` })
	}
}

const updateNote = async (req, res) => {
	const { title, content } = req.body;
	const id = req.params.id;

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

const deleteNoteById = async (req, res) => {
	const id = req.params.id;
	const cookies = req.cookies
	const refreshToken = cookies.jwt;
	try {
		const userById = await User.findOne({ refreshToken: refreshToken }).exec();
		userById.notes = userById.notes.filter((note) => {
			note != id
		});
		await userById.save();
		const result = await Note.findByIdAndDelete(id).exec();
		res.status(200).json({ 'message': `Note ${result._id} deleted!` });
	} catch (error) {
		res.status(500).json({ 'message': `Note not deleted: ${error.message}` });
	}
}

module.exports = {
	getNotes,
	getNoteById,
	createNote,
	getNotesByUser,
	updateNote,
	deleteNoteById
}
