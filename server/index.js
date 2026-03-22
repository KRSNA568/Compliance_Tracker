const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const clientsRouter = require('./routes/clients');
const tasksRouter = require('./routes/tasks');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandlers');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5173'];
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Mini Compliance Tracker API' });
});

app.use('/api', clientsRouter);
app.use('/api', tasksRouter);

app.use('/api/*splat', notFoundHandler);
app.use(globalErrorHandler);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
