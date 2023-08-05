import { configureStore } from "@reduxjs/toolkit";

import notesReducer from '../notes/noteSlice';
import usersReducer from '../notes/userSlice';

export default configureStore({
    reducer: {
        notes: notesReducer,
        user: usersReducer
    }
});