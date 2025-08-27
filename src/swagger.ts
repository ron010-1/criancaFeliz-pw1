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
        schemas: {
          LoginInput: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email", example: "usuario@email.com" },
              password: { type: "string", example: "123456" },
            },
          },
          LoginResponse: {
            type: "object",
            properties: {
              token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            },
          },
          Beneficiario: {
            type: "object",
            properties: {
              id: { type: "string", example: "uuid-do-beneficiario" },
              nome: { type: "string", example: "João da Silva" },
              nome_responsavel: { type: "string", example: "Maria da Silva" },
              data_nascimento: { type: "string", format: "date", example: "2015-03-12" },
              location: { type: "string", example: "Rua A, 123, Cidade, Estado" },
              phone1: { type: "string", example: "(83) 99999-1111" },
              phone2: { type: "string", example: "(83) 98888-2222" },
            },
          },
          BeneficiarioInput: {
            type: "object",
            required: ["nome", "nome_responsavel", "data_nascimento", "location", "phone1"],
            properties: {
              nome: { type: "string", example: "João da Silva" },
              nome_responsavel: { type: "string", example: "Maria da Silva" },
              data_nascimento: { type: "string", format: "date", example: "2015-03-12" },
              location: { type: "string", example: "Rua A, 123, Cidade, Estado" },
              phone1: { type: "string", example: "(83) 99999-1111" },
              phone2: { type: "string", example: "(83) 98888-2222" },
            },
          },
          AssistenteSocial: {
            type: "object",
            properties: {
              id: { type: "string", example: "uuid-do-assistente" },
              nome: { type: "string", example: "Carlos Souza" },
              email: { type: "string", format: "email", example: "carlos@email.com" },
              telefone: { type: "string", example: "(83) 97777-3333" },
            },
          },
          AssistenteSocialInput: {
            type: "object",
            required: ["nome", "email", "telefone"],
            properties: {
              nome: { type: "string", example: "Carlos Souza" },
              email: { type: "string", format: "email", example: "carlos@email.com" },
              telefone: { type: "string", example: "(83) 97777-3333" },
            },
          },
          Visita: {
            type: "object",
            properties: {
              id: { type: "string", example: "uuid-da-visita" },
              date: { type: "string", format: "date", example: "2025-08-27" },
              imagens: { type: "array", items: { type: "string" }, example: ["https://img.com/foto1.png"] },
              evolucao: { type: "string", example: "Paciente estável." },
              acompanhamento_familiar: { type: "string", example: "Família presente." },
              estimulo_familiar: { type: "string", example: "Família estimula paciente em casa." },
              beneficiarioId: { type: "string", example: "uuid-do-beneficiario" },
            },
          },
          VisitaInput: {
            type: "object",
            required: ["date", "evolucao", "acompanhamento_familiar", "estimulo_familiar", "beneficiarioId"],
            properties: {
              date: { type: "string", format: "date", example: "2025-08-27" },
              imagens: { type: "array", items: { type: "string" }, example: ["https://img.com/foto1.png"] },
              evolucao: { type: "string", example: "Paciente estável." },
              acompanhamento_familiar: { type: "string", example: "Família presente." },
              estimulo_familiar: { type: "string", example: "Família estimula paciente em casa." },
              beneficiarioId: { type: "string", example: "uuid-do-beneficiario" },
            },
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
