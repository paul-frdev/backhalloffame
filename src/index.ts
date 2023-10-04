const { api } = require('./routes/api');
const express = require('express');
const http = require('node:http');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
  })
);

app.use(morgan('combined'));

app.use(express.json());

app.use('/', api);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
