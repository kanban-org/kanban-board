require('dotenv').config();
import express from 'express';
import Routes from './Routes/routes';
import Error from './app/Exceptions/Error';
const bodyParser = require('body-parser');

const app = express();
var cors = require('cors');
const { sequelize } = require('./models');
const port = process.env.PORT || 3080;

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, auth-token'
  );
  next();
});

// Routes
app.use('/api', Routes.BoardApiRouter);
app.use('/api', Routes.TrackApiRouter);

app.get('/', (req, res) => {
  res.status(200).json('Hi Kanban!');
});

// We should get this as a output if we get it...
app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Page not found',
  });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
});

app.use((error, req, res, next) => {
  //special 4 term function that lets know error to consider it as error
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred!',
    success: error.success || false,
  });
});

// Initializing the server and database

app.listen(port, async () => {
  console.log(`Server started on http://localhost:${port}`);
  await sequelize.sync({});
  console.log('DB Connected');
});
