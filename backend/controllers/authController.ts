const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const handlerAuth = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ 'message': 'Username and password are required' });
	}
	const findUser = await User.findOne({ username: username }).exec();
	const match = bcrypt.compare(password, findUser.password);
	if (match) {
		const accessToken = jwt.sign(
			{ "username": findUser.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30s' }
		);
		const refreshToken = jwt.sign(
			{ "username": findUser.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);
		findUser.refreshToken = refreshToken;

		res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

		findUser.save().then((r) => console.log(`${r} salvo!`));

		res.status(200).json({ accessToken });
	} else {
		res.status(401);
	}
}

module.exports = {
	handlerAuth
}