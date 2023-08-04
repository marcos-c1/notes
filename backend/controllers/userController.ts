const User = require('../models/User');
const bcrypt = require('bcrypt');

const getUsers = async(req, res) => {
	try {
		const result = await User.find().exec();
		res.status(200).json(result);
	} catch(error){
		res.status(500).json({'message': `No data found: ${error.message}`});
	}
}

const getUserById = async(req, res) => {
	const id = req.params.id;
	try {
		const result = await User.findById(id).exec();	
		res.status(200).json(result);
	} catch(error) {
		res.status(500).json({'message': `User not found: ${error.message}`});
	}
}

const createUser = async (req, res) => {
    const { username, password } = req.body;

    const alreadyHasUser = await User.findOne({ username: username }).exec();

    if (alreadyHasUser) return res.status(409).json({'message': 'User already registred'});

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const result = await User.create({
            "username": username,
            "password": hashedPwd
        });
        res.status(200).json({ 'message': `New user ${user} created!` });
    } catch (error) {
        res.status(500).json({ 'message': `User not created: ${error.message}` });
    }
}

const deleteUserById = async (req, res) => {
    const id = req.params.id;

    const hasUser = await User.findById(id).exec();

    if (!hasUser) return res.status(404).json({'message': 'User not found'});

    try {
        const result = await User.findByIdAndDelete(id);
        res.status(200).json({ 'message': `User ${result} deleted!` });
    } catch (error) {
        res.status(500).json({ 'message': `User not deleted: ${error.message}`});
    }
}

module.exports = {
	getUsers,
	getUserById,
    createUser,
	deleteUserById
}
