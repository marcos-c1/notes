import { configureStore } from "@reduxjs/toolkit";

import notesReducer from '../notes/noteSlice';
import { userSlice } from '../notes/userSlice';

export default configureStore({
    reducer: {
        notes: notesReducer,
        user: userSlice.reducer
    }
});