const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const handlerAuth = async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password)
	if (!username || !password) {
		return res.status(400).json({ 'message': 'Username and password are required' });
	} else {
		try {
			const findUser = await User.findOne({ username: username }).exec();
			console.log(findUser)

			const match = await bcrypt.compare(password, findUser.password);
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

				res.status(200).json({ 'id': findUser._id, 'accessToken': accessToken });
			} else {
				res.status(500).json({ 'message': `Invalid password` })
			}
		} catch (error) {
			console.error(error.message)
			res.status(500).json({ 'message': `Server error ${error.message}` })
		}
	}

}

const handlerLogout = async (req, res) => {
	// Set token to none and expire after 5 seconds
	res.cookie('jwt', 'none', {
		expires: new Date(Date.now() + 5 * 1000),
		httpOnly: true,
	})
	res
		.status(200)
		.json({ 'message': 'User logged out successfully' })
}

module.exports = {
	handlerAuth,
	handlerLogout
}
