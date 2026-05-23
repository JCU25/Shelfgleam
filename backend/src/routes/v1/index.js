const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
	console.log(`Your user agent is ${req.headers["user-agent"]}`);
	res.status(200).json({ message: "Welcome to Shelfgleam v1" });
});

module.exports = router;
