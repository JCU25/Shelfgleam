import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Shelfgleam API",
			version: "1.0.0",
			description: "API documentation for Shelfgleam application",
		},
		servers: [
			{
				url: "http://localhost:3000",
				description: "Development server",
			},
		],
	},
	apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
