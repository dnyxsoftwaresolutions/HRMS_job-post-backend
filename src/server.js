const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const jobPostRoutes = require('./routes/jobPostRoutes');
const savedPrefRoutes = require('./routes/savedPrefRoutes');
const { PrismaClient } = require('@prisma/client');

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// ✅ Allowed origins
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://hrms.dnyx.in',
  'https://hrms.dnyx.in/recruitment/create-job'
];

// ✅ Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middlewares
app.use(express.json());

// API routes
app.use('/api/job-posts', jobPostRoutes);
app.use('/api/saved-preferences', savedPrefRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to Prisma:', error);
    process.exit(1);
  }
};

startServer();
