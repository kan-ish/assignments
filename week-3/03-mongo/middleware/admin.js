const { Admin } = require("../db");

async function isAdminExists(req, res, next) {
	const { username, password } = req.body;

	if (!username || !password) {
		res.status(400).json({
			message: "Incomplete data.",
		});

		return;
	}

	try {
		const isAdminExists = await Admin.findOne({ username: username });

		if (isAdminExists) {
			res.status(400).json({
				message: "An admin by this name already exists.",
			});
		} else {
			next();
		}
	} catch (err) {
		res.status(400).json({
			message: "Something went wrong. Please contact support",
		});
	}
}

async function authenticateAdmin(req, res, next) {
	const { username, password } = req.headers;

	if (!username || !password) {
		res.status(400).json({
			message: "Invalid credentials.",
		});
	} else {
		try {
			const admin = await Admin.findOne({ username: username });

			if (!admin) {
				res.status(401).json({
					message: "User does nto exist. Please signup first.",
				});
			} else if (admin.password !== password) {
				res.status(401).json({
					message: "Wrong username or password. Please try again.",
				});
			} else {
				next();
			}
		} catch (err) {
			res.status(400).json({
				message: "Something went wrong. Please contact support",
			});
		}
	}
}

module.exports = { authenticateAdmin, isAdminExists };
