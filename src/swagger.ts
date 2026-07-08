import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

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
          GeoPoint: {
            type: "object",
            description: "Ponto de geolocalização (GeoJSON). coordinates segue o padrão [longitude, latitude].",
            required: ["type", "coordinates"],
            properties: {
              type: { type: "string", example: "Point" },
              coordinates: {
                type: "array",
                items: { type: "number" },
                minItems: 2,
                maxItems: 2,
                example: [-34.8631, -7.1195],
              },
            },
          },
          Beneficiario: {
            type: "object",
            properties: {
              id: { type: "string", example: "uuid-do-beneficiario" },
              nome: { type: "string", example: "João da Silva" },
              nome_responsavel: { type: "string", example: "Maria da Silva" },
              data_nascimento: { type: "string", format: "date", example: "2015-03-12" },
              location: { $ref: "#/components/schemas/GeoPoint" },
              phone1: { type: "string", example: "(83) 99999-1111" },
              phone2: { type: "string", example: "(83) 98888-2222" },
              assistenteId: {
                type: "string",
                nullable: true,
                description: "UUID do assistente social que cadastrou este beneficiário (null se foi cadastrado por um admin). Define quem pode editar/excluir.",
                example: "uuid-do-assistente",
              },
              foto: {
                type: "string",
                format: "uri",
                nullable: true,
                description: "URL da foto de perfil do beneficiário, já hospedada (ex.: Cloudinary). A API não recebe o arquivo binário, só a URL.",
                example: "https://res.cloudinary.com/demo/image/upload/beneficiario.jpg",
              },
            },
          },
          BeneficiarioInput: {
            type: "object",
            required: ["nome", "nome_responsavel", "data_nascimento", "location", "phone1"],
            properties: {
              nome: { type: "string", example: "João da Silva" },
              nome_responsavel: { type: "string", example: "Maria da Silva" },
              data_nascimento: { type: "string", format: "date", example: "2015-03-12" },
              location: { $ref: "#/components/schemas/GeoPoint" },
              phone1: { type: "string", example: "(83) 99999-1111" },
              phone2: { type: "string", example: "(83) 98888-2222" },
              foto: {
                type: "string",
                format: "uri",
                description: "URL da foto de perfil já hospedada (ex.: Cloudinary). Campo opcional.",
                example: "https://res.cloudinary.com/demo/image/upload/beneficiario.jpg",
              },
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
              imagens: {
                type: "array",
                items: { type: "string", format: "uri" },
                description: "URLs das fotos da visita, já hospedadas (ex.: Cloudinary). A API não recebe arquivo binário, só as URLs.",
                example: [
                  "https://res.cloudinary.com/demo/image/upload/visita1.jpg",
                  "https://res.cloudinary.com/demo/image/upload/visita2.jpg",
                ],
              },
              evolucao: { type: "string", example: "Paciente estável." },
              acompanhamento_familiar: { type: "string", example: "Família presente." },
              estimulo_familiar: { type: "string", example: "Família estimula paciente em casa." },
              beneficiarioId: { type: "string", example: "uuid-do-beneficiario" },
              assistenteId: {
                type: "string",
                nullable: true,
                description: "UUID do assistente social que cadastrou esta visita (null se foi cadastrada por um admin). Define quem pode editar/excluir.",
                example: "uuid-do-assistente",
              },
            },
          },
          VisitaInput: {
            type: "object",
            required: ["date", "evolucao", "acompanhamento_familiar", "estimulo_familiar", "beneficiarioId"],
            properties: {
              date: { type: "string", format: "date", example: "2025-08-27" },
              imagens: {
                type: "array",
                items: { type: "string", format: "uri" },
                description: "URLs das fotos já hospedadas (ex.: Cloudinary). Em uma edição (PATCH), enviar este campo substitui TODAS as fotos anteriores da visita (não é possível adicionar/remover individualmente); omitir o campo mantém as fotos atuais.",
                example: [
                  "https://res.cloudinary.com/demo/image/upload/visita1.jpg",
                  "https://res.cloudinary.com/demo/image/upload/visita2.jpg",
                ],
              },
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
    apis: [path.join(__dirname, "routes", "*.{ts,js}")],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
