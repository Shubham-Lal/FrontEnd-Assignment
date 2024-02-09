require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');
const connectDB = require('./db/connectDB.js');

const server = express();

server.use(express.json({ limit: '5mb' }));

server.use(cors());

server.use(routes);

connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server listening on PORT => ${PORT}`));
});