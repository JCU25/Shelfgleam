import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json" with { type: "json" };
import dotenv from "dotenv";
import express from "express";
import http from "http";
import routes from "./routes/index.js";

dotenv.config({
	path: ".env",
	override: true,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", routes);

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log(`API documentation available at http://localhost:${port}/docs`);
	console.log(`API endpoint: http://localhost:${port}/v1`);
});
