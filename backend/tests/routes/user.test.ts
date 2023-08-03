const { getUsers, getUsersById, createUser, deleteUserById } = require('../../controllers/userController');
const mongoose = require("mongoose");
require("dotenv").config();

describe('user route testing', () => {
	test('get all users', async () => {
		await mongoose.connect(process.env.MONGO_URI);
		const res = fetch('localhost:5000/users/', 'get').then((r) => expect(r).toBe([]));
	});
})
