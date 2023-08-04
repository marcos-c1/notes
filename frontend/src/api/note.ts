require('dotenv').config();

const PORT = process.env.PORT;

const getAllNotes = async () => {
    return await axios.get(`localhost:${PORT}/notes`).then((response) => response.data)
}

const createNote = async (title: String, content: String) => {
    return await axios.post(`localhost:${PORT}/notes`, {title, content}) 
}

const getNoteById = async (id: Number) => {
    return await axios.get(`localhost:${PORT}/note/${id}`).then((response) => response.data)
}

const deleteNoteById = async (id: Number) => {
     return await axios.delete(`localhost:${PORT}/note/${id}`) 
}

export const {
	getAllNotes,
	getNoteById,
	createNote,
	deleteNoteById
}
