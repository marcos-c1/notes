require('dotenv').config();

const PORT = process.env.PORT;

const getAllUsers = async () => {
    return await axios.get(`localhost:${PORT}/users`).then((response) => response.data.map((user) => user.username))
}

const createUser = async (username: String, password: String) => {
    return await axios.post(`localhost:${PORT}/users`, {username, password}) 
}

const getUserById = async (id: Number) => {
    return await axios.get(`localhost:${PORT}/user/${id}`).then((response) => response.data.username) 
}

const deleteUserById = async (id: Number) => {
    return await axios.delete(`localhost:${PORT}/note/${id}`) 
}

export const {
	getAllUsers,
	getUserById,
	deleteUserById,
	createUser
}
