const { getUsers, getUsersById, createUser, deleteUserById } = require('../../controllers/userController');
require("dotenv").config();

describe('user route testing', () => {
	test('get all users', async () => {
		const res = await fetch('http://localhost:5000/users', {
			method: 'GET',
			headers: {
				"Content-type": "application/json",
			},
		});
		expect(res.status).toBe(200);
	});

	test('create a user', async () => {
		const payload = '{"username": "teste", "password": "123"}';
		const res = await fetch('http://localhost:5000/user/register', {
			method: 'POST',
			body: payload,
			headers: {
				"Content-type": "application/json",
			},
		});
		expect(res.status).toBe(200 || 409);
	})

	test('delete a user', async () => {
		const id = "64cbf8da99aa918439a4fa42"
		const res = await fetch(`http://localhost:5000/user/${id}`, { 
			method: 'DELETE',                                             
			headers: {
				"Content-type": "application/json",
			},
		});
		expect(res.status).toBe(200 || 404);
	})
});
