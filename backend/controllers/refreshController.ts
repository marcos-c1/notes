const User = require('../models/User');
const jwt = require("jsonwebtoken");
require('dotenv').config();

const handleRefreshToken = async(req, res) => {
	const cookies = req.cookies	
	if(!cookies?.jwt) return res.status(401);
	console.log(cookies.jwt);

	const refreshToken = cookies.jwt;
	
	try {
		const findUserByToken = await User.findOne({refreshToken: refreshToken}).exec();
		if(!findUserByToken) return res.sendStatus(403);

		// evaluate jwt
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(err, decoded) => {
				if(err || findUserByToken.username !== decoded.username) return res.sendStatus(403)
					const accessToken = jwt.sign(
						{ "username": findUserByToken.username},
						process.env.ACCESS_TOKEN_SECRET,
						{ expiresIn: '30s'}
					);
					res.json({ accessToken });
			});
	} catch(error) {
		res.status(500).json({'message': `Server error: ${error.message}`});
	}
}

module.exports = {
	handleRefreshToken
}
