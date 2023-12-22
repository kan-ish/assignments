const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
	.connect(
		`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_SECRET}@cluster0.wvdwh1q.mongodb.net/`
	)
	.then(() => console.log("Connected to MongoDB successfully."))
	.catch((err) => console.error(err));

// Define schemas
const AdminSchema = new mongoose.Schema({
	// Schema definition here
	username: String,
	password: String,
});

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	purchasedCourses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});

const CourseSchema = new mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	imageLink: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
	Admin,
	User,
	Course,
};
