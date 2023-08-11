import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/user';

const initialState = {
	loading: false,
	users: [],
	error: ''
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
			state.error = '';
		});
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.loading = false;
			state.users = [];
			state.error = action.error.message;
		});
		builder.addCase(postUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(postUser.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
		});
		builder.addCase(postUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	// the inside "thunk function"
	const users = await userAPI.getAllUsers();
	return users;
})

export const postUser = createAsyncThunk('users/postUser', async (payload: { fullname: String, email: String, username: String, password: String }) => {
	const user = await userAPI.createUser(payload.fullname, payload.email, payload.username, payload.password).then((r) => r.data);
	return user;
})

export default userSlice.reducer;
