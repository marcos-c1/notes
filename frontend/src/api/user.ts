import axios from "axios";

const getAllUsers = async () => {
    return await axios.get(`http://localhost:5000/users`).then((response) => response.data)
}

const createUser = async (username: String, password: String) => {
    return await axios.post(`http://localhost:5000/users`, { username, password })
}

const getUserById = async (id: Number) => {
    return await axios.get(`http://localhost:5000/user/${id}`).then((response) => response.data.username)
}

const deleteUserById = async (id: Number) => {
    return await axios.delete(`http://localhost:5000/user/${id}`)
}

export default {
    getAllUsers,
    getUserById,
    deleteUserById,
    createUser
}
