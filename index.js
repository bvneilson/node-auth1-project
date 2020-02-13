const express = require('express');

const server = express();
const port = 5010;

server.use(express.json());

server.listen(port, () => console.log(`Server listening on port ${port}`))
