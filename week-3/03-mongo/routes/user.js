const { User } = require("../db/index");
const { Router } = require("express");
const router = Router();
const { iseUserExists, authenticateUser } = require("../middleware/user");

// User Routes
router.post("/signup", iseUserExists, (req, res) => {
	const { username, password } = req.body;

	const newUser = new User({ username: username, password: password });
	newUser
		.save()
		.then(() => res.json({ message: "User created successfully." }))
		.catch((err) => {
			console.error(err);
			res.status(400).json({
				message: "Could not creat user. Please contact support.",
			});
		});
});

router.get("/courses", authenticateUser, (req, res) => {
	res.send("received");
});

router.post("/courses/:courseId", (req, res) => {
	// Implement course purchase logic
});

router.get("/purchasedCourses", (req, res) => {
	// Implement fetching purchased courses logic
});

module.exports = router;
