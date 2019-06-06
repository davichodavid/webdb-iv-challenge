const express = require("express");
const helmet = require("helmet");

const dishRouter = require("./dishesRouter/dishesRouter");

const server = express();
server.use(express.json(), helmet());

server.use("/api/dishes", dishRouter);

const port = process.env.PORT || 3500;
server.listen(port, () => {
  console.log(`port ${port}: Waaaassaaaaaaaaapppppp`);
});
