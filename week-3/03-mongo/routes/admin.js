const { Router } = require("express");
const isAdminExists = require("../middleware/admin");
const { Admin } = require("../db");

const router = Router();

// Admin Routes
router.post("/signup", isAdminExists, async (req, res) => {
	const { username, password } = req.body;

	const admin = new Admin({ username: username, password: password });
	admin
		.save()
		.then(() => res.json({ message: "Admin created successfully." }))
		.catch((err) => {
			console.error(err);
			res.status(400).json({
				message: "Could not create admin. Please contact support.",
			});
		});
});

router.post("/courses", isAdminExists, (req, res) => {
	// Implement course creation logic
});

router.get("/courses", isAdminExists, (req, res) => {
	// Implement fetching all courses logic
});

module.exports = router;
