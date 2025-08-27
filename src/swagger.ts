import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export default function setupSwagger(app: Express) {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Criança Feliz",
        version: "1.0.0",
        description: "API de Beneficiários, Visitas, Assistentes Sociais e Login",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: ["./controller/*.ts", "./routes/*.ts"],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
