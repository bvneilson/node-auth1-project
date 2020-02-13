const express = require('express');
const userRoutes = require('./users/user-router.js');

const server = express();
const port = 5010;

server.use(express.json());
server.use('/api', userRoutes);

server.listen(port, () => console.log(`Server listening on port ${port}`))
