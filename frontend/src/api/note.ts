import axios from "axios";

const getAllNotes = async () => {
    return await axios.get(`http://localhost:5000/notes`)
}

const createNote = async (title: String, content: String) => {
    return await axios.post(`http://localhost:5000/notes`, { title, content })
}

const getNoteById = async (id: Number) => {
    return await axios.get(`http://localhost:5000/note/${id}`)
}

const deleteNoteById = async (id: Number) => {
    return await axios.delete(`http://localhost:5000/note/${id}`)
}

export default {
    getAllNotes,
    getNoteById,
    createNote,
    deleteNoteById
}
