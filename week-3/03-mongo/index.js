const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3001;

app.use((err, req, res, next) => {
	console.error(err);
	res.status(400).json({ message: "Something went wrong. Please try again." });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
