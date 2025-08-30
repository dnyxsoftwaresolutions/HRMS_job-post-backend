const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'HRMS Job Posting API',
    version: '1.0.0',
    description: 'API for managing job postings and saved preferences in an HRMS.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Development server',
    },
    {
      url: 'https://hrms.dnyx.in/recruitment/create-job',
      description: 'Staging server',
    },
    {
      url: 'https://hrms-job-post-backend.onrender.com/',
      description: 'Production server',
    },
  ],
  tags: [
    { name: 'Job Posts', description: 'Operations for managing job posts.' },
    { name: 'Saved Preferences', description: 'Operations for managing saved job preferences.' },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
