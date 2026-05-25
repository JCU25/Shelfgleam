import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../../swagger.js" with { type: "json" };
import dotenv from "dotenv";
import express from "express";
import http from "http";
import routes from "./routes/index.js";
import { swaggerSpec } from "../swagger.js";

dotenv.config({
	path: ".env",
	override: true,
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	console.log(`API documentation available at http://localhost:${port}/docs`);
	console.log(`API endpoint: http://localhost:${port}/api/v1`);
});
