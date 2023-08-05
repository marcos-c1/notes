import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/user';

const initialState = {
	loading: false,
	users: [],
	error: '',
}


const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
	// the inside "thunk function"
	return userAPI.getAllUsers();
})

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
	},
});

export default userSlice.reducer;
