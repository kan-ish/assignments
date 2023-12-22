const { User, Course } = require("../db/index");
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

router.get("/courses", authenticateUser, async (req, res) => {
	const courses = await Course.find();

	res.json({ courses: courses });
});

router.post("/courses/:courseId", authenticateUser, async (req, res) => {
	const { username } = req.headers;
	const { courseId } = req.params;

	try {
		const course = await Course.findById({ _id: courseId });

		if (!course) {
			console.log("not found");
			res.status(400).json({ message: "Sorry, the course does not exist." });
			return;
		} else {
			const user = await User.findOne({ username: username });
			if (user.purchasedCourses.includes(course._id)) {
				res
					.status(400)
					.json({ message: "You already have this course in your purchases!" });
				return;
			} else {
				const updatedUser = await User.findOneAndUpdate(
					{ username: username },
					{ $addToSet: { purchasedCourses: course._id } },
					{ new: true }
				);

				updatedUser
					.save()
					.then(() => {
						console.log(updatedUser);
						res.json({ message: "Course purchased successfully" });
					})
					.catch((err) => {
						console.error(err);
					});
			}
		}
	} catch (err) {
		res
			.status(400)
			.json({ message: "Something went wrong. Please try again." });
	}
});

router.get("/purchasedCourses", (req, res) => {
	// Implement fetching purchased courses logic
});

module.exports = router;
