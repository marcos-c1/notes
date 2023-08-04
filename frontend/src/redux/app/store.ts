import { configureStore } from "@reduxjs/toolkit";

import notesReducer from '../notes/noteSlice';
import userReducer from '../notes/userReducer';

export default configureStore({
    reducer: {
        notes: notesReducer,
		user: userReducer
    }
});
