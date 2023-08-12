const User = require('../models/User');
const Note = require('../models/Note');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies

	if (!cookies?.jwt) {
		res.status(401);
	} else {
		const refreshToken = cookies.jwt;
		try {
			const findUserByToken = await User.findOne({ refreshToken: refreshToken }, { refreshToken: { $elemMatch: { refreshToken: String } } }).exec();
			// evaluate jwt
			jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
				async (err, decoded) => {
					if (err || findUserByToken.username !== decoded.username) return res.sendStatus(403)
					const accessToken = jwt.sign(
						{ "username": findUserByToken.username },
						process.env.ACCESS_TOKEN_SECRET,
						{ expiresIn: '30s' }
					);
					const notesFromUser = await Note.find({ user: findUserByToken.id }).exec();

					res.json({ 'id': findUserByToken._id, 'username': findUserByToken.username, 'accessToken': accessToken, 'notes': notesFromUser });
				});
		} catch (error) {
			res.status(500).json({ 'message': `Server error: ${error.message}` });
		}
	}

}

module.exports = {
	handleRefreshToken
}
