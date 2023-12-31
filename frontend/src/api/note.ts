import axios from "axios";

const getAllNotes = async () => {
    return await axios.get(`http://localhost:5000/notes`)
}

const createNote = async (title: String, content: String, user: String) => {
    return await axios.post(`http://localhost:5000/notes`, { title, content, user })
}

const getNoteById = async (id: Number) => {
    return await axios.get(`http://localhost:5000/note/${id}`)
}

const deleteNoteById = async (id: String) => {
    return await axios.delete(`http://localhost:5000/note/${id}`)
}

const updateNoteById = async (id: String, title: String, content: String) => {
    return await axios.put(`http://localhost:5000/note/${id}`, { title, content })
}

const fetchNotesByUser = async () => {
    return await axios.get(`http://localhost:5000/notes/user`);
}


export default {
    getAllNotes,
    getNoteById,
    createNote,
    deleteNoteById,
    updateNoteById,
    fetchNotesByUser
}
