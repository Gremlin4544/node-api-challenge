const express = require('express');
const cors = require('cors');

const server = express();

const projectRouter = require('./api/projectRouter.js');
const actionRouter = require('./api/actionRouter.js');

server.use(express.json());
server.use(logger);
server.use(cors());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/',  (req, res) => {
  res.status(200).json({"its working! its working!"});
});

//custom middleware

function logger(req, res, next) {

  console.log(`Logger: ${req.method} ${req.url}`);

  next();
}

module.exports = server;