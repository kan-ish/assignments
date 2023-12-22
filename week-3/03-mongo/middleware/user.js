const { User } = require("../db/index");

async function iseUserExists(req, res, next) {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({ message: "Incomplete data." });
		return;
	}

	try {
		const isUserExists = await User.findOne({ username: username });

		if (isUserExists) {
			res.status(400).json({
				message: "A User with this username already exists.",
			});
		} else {
			next();
		}
	} catch (err) {
		console.error(err);
		res.status(400).json({
			message: "Something went wrong. Please contact support.",
		});
	}
}

async function authenticateUser(req, res, next) {
	const { username, password } = req.headers;

	next();
}

module.exports = { iseUserExists, authenticateUser };
