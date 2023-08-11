import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/user';

const initialState = {
	loading: false,
	user: {},
	error: ''
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
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
		builder.addCase(authUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(authUser.fulfilled, (state, action) => {
			state.loading = false;
			state.user = { ...state.user, ...action.payload };
			state.error = '';
		});
		builder.addCase(authUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
		builder.addCase(getUserById.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserById.fulfilled, (state, action) => {
			state.loading = false;
			state.user = { ...state.user, ...action.payload };
			state.error = '';
		});
		builder.addCase(getUserById.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export const postUser = createAsyncThunk('users/postUser', async (payload: { fullname: String, email: String, username: String, password: String }) => {
	const user = await userAPI.createUser(payload.fullname, payload.email, payload.username, payload.password).then((r) => r.data);
	return user;
})

export const authUser = createAsyncThunk('users/authUser', async (payload: { username: String, password: String }) => {
	const accessToken = await userAPI.authUser(payload.username, payload.password)
	return accessToken
})

export const refreshToken = createAsyncThunk('users/authUser', async () => {
	const user = await userAPI.findUserByToken();
	return user
})

export const getUserById = createAsyncThunk('users/getUserById', async (id: String) => {
	const user = await userAPI.getUserById(id);
	return user;
})

export default userSlice.reducer;
