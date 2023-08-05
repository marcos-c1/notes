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
        builder.addCase(addNewNote.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addNewNote.fulfilled, (state, action) => {
            state.loading = false;
            state.notes.push(action.payload);
        });
        builder.addCase(addNewNote.rejected, (state, action) => {
            state.loading = false;
            state.notes = [...state.notes];
            state.error = action.error.message;
        });
        builder.addCase(deleteNoteById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteNoteById.fulfilled, (state, action) => {
            state.loading = false;
            state.notes = state.notes.filter((n) => action.payload != n._id)
            state.error = '';
        });
        builder.addCase(deleteNoteById.rejected, (state, action) => {
            state.loading = false;
            state.notes = [...state.notes];
            state.error = action.error.message;
        });
        builder.addCase(updateNoteById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateNoteById.fulfilled, (state, action) => {
            state.loading = false;
            state.notes = state.notes.map((n) => {
                if (action.payload._id == n._id) {
                    return { ...n, title: action.payload.title, content: action.payload.content };
                }
                return n;
            });
            state.error = '';
        });
        builder.addCase(updateNoteById.rejected, (state, action) => {
            state.loading = false;
            state.notes = [...state.notes];
            state.error = action.error.message;
        });
    },
});

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    // the inside "thunk function"]
    const notes = await notesAPI.getAllNotes().then((r) => r.data);
    return notes;
})

export const addNewNote = createAsyncThunk('notes/addNewNote', async (newNote: { title: String, content: String }) => {
    // the inside "thunk function"]
    const notes = await notesAPI.createNote(newNote.title, newNote.content).then((r) => r.data);
    return notes;
})

export const deleteNoteById = createAsyncThunk('notes/deleteNote', async (id: String) => {
    // the inside "thunk function"]
    await notesAPI.deleteNoteById(id).then((r) => console.log(r));
    return id;
})

export const updateNoteById = createAsyncThunk('notes/updateNote', async (newNote: { id: String, title: String, content: String }) => {
    // the inside "thunk function"]
    const note = notesAPI.updateNoteById(newNote.id, newNote.title, newNote.content).then((r) => r.data);
    return note;
})

export const { addNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;