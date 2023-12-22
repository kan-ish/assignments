const { Router } = require("express");
const { isAdminAuth, isAdminExists } = require("../middleware/admin");
const { Admin, Course } = require("../db");

const router = Router();

// Admin Routes
router.post("/signup", isAdminExists, async (req, res) => {
	const { username, password } = req.body;

	const newAdmin = new Admin({ username: username, password: password });
	newAdmin
		.save()
		.then(() => res.json({ message: "Admin created successfully." }))
		.catch((err) => {
			console.error(err);
			res.status(400).json({
				message: "Could not create admin. Please contact support.",
			});
		});
});

router.post("/courses", isAdminAuth, (req, res) => {
	const { title, description, price, imageLink } = req.body;

	if (!title || !description || !price || !imageLink) {
		res.status(400).json({ message: "Incomplete course data." });
		return;
	}

	const newCourse = new Course({ title, description, price, imageLink });
	newCourse
		.save()
		.then(() =>
			res.json({
				message: "Course created successfully.",
				courseId: newCourse._id,
			})
		)
		.catch((err) => {
			console.error(err);
			res.status(400).json({
				message: "Could not create course. Please contact support.",
			});
		});
});

router.get("/courses", isAdminAuth, (req, res) => {
	// Implement fetching all courses logic
});

module.exports = router;
