const express = require ('express');
// const bodyParser = require('body-parser'); //verify if needed later
const fetch = require('node-fetch');

const server = express();
// server.use(bodyParser.json());

const PORT = 3000;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;


server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});