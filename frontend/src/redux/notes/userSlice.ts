import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../../api/user;

const initialState = await getAllUsers();

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
		addUser(state, action) {
			state.push({
				username: action.payload.username,
				password: action.payload.password
			})
		},
		deleteUser(state, action) {
			state.filter((u) => {
				u.id !== action.payload
			})
		},
		getUser(state, action) {
			state.find(u => u.id === action.payload)
		}
	}
});

export const { addUser, deleteUser, getUser } = userSlice.actions
export default userSlice.reducer;
