import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import notesAPI from '../../api/note';

const initialState = {
    loading: false,
    notes: [],
    error: '',
}

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote(state, action) {
            state.notes.push(action.payload)
        },
        deleteNote(state, action) {
            const { id } = action.payload
            state.notes = state.notes.filter(note => note.id != id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
            state.loading = false;
            state.notes = action.payload;
            state.error = '';
        });
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false;
            state.notes = [];
            state.error = action.error.message;
        });
    },
});

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    // the inside "thunk function"]
    const notes = await notesAPI.getAllNotes().then((r) => r.data);
    return notes;
})

export const { addNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
