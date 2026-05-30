import swaggerUi from "swagger-ui-express";
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import routes from "./routes/index.js";
import { swaggerSpec } from "../swagger.js";

dotenv.config({
	path: "./config/.env",
	override: true,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

const server = http.createServer(app);

server.listen(port, () => {
	console.log(chalk.green(`Server is running on port ${port}`));
	console.log(
		chalk.green(
			`API documentation available at http://localhost:${port}/docs`,
		),
	);
	console.log(chalk.green(`API endpoint: http://localhost:${port}/api/v1`));
});
