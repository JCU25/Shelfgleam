import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		host: `localhost:${process.env.PORT}`,
		basePath: "/api/v1",

		info: {
			title: "Shelfgleam API",
			version: "1.0.0",
			description: "API documentation for Shelfgleam application",
		},
		servers: [
			{
				url: "http://localhost:8000",
				description: "Development server",
			},
		],
	},
	apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
