import { createSlice } from '@reduxjs/toolkit';
import { getAllNotes } from '../../api/note;

const initialState = await getAllNotes();

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
		addNote(state, action) {
			state.push({
				title: action.payload.title,
				content: action.payload.content
			})
		},
		deleteNote(state, action) {
			state.filter((n) => {
				n.id !== action.payload
			})
		},
		getNote(state, action) {
			state.find(n => n.id === action.payload)
		}
	}
});

export const { addNote, deleteNote, getNote } = notesSlice.actions
export default notesSlice.reducer;
