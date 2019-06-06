const express = require("express");
const helmet = require("helmet");

const server = express();
server.use(express.json(), helmet());

// create endpoint for router

const port = process.env.PORT || 3500;
server.listen(port, () => {
  console.log(`port ${port}: Waaaassaaaaaaaaapppppp`);
});
