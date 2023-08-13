import axios from "axios";

axios.defaults.withCredentials = true;

const getAllUsers = async () => {
    return await axios.get(`http://localhost:5000/users`).then((response) => response.data)
}

const createUser = async (fullname: String, email: String, username: String, password: String) => {
    return await axios.post(`http://localhost:5000/user/register`, { fullname, email, username, password })
}

const authUser = async (username: String, password: String) => {
    const token = await axios.post('http://localhost:5000/auth', { username, password }).then((r) => r.data);
    return token;
}

const getUserById = async (id: String) => {
    return await axios.get(`http://localhost:5000/user/${id}`).then((response) => response.data)
}

const findUserByToken = async () => {
    return await axios.get(`http://localhost:5000/refresh`).then((response) => response.data)
}

const logoutUser = async () => {
    return await axios.get('http://localhost:5000/logout').then((r) => r.data);
}
const deleteUserById = async (id: Number) => {
    return await axios.delete(`http://localhost:5000/user/${id}`)
}

export default {
    getAllUsers,
    getUserById,
    deleteUserById,
    createUser,
    authUser,
    findUserByToken,
    logoutUser
}
