require("dotenv").config({
	path: ".env",
	override: true,
});

console.log(process.env.DATABASE_URL);
const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", require("./routes/index"));

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log(`API endpoint: http://localhost:${port}/v1`);
});
