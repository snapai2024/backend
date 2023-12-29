import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Generic template backend',
      version: '0.0.1',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:5000/' }],
  },
  apis: [`src/api/routes/index.ts`],
};

export const openapiSpecification = swaggerJsdoc(options);
