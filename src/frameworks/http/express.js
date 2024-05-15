const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const socketHandler = require('./socket');
function createExpressApp(routers,bidRepository) {
  let app = express();

  const server = http.createServer(app);
  const io = socketIo(server);
  app.use(express.json());
  app.use(express.static('public'));
  socketHandler(io,bidRepository);

  for (let router of routers) {
    app.use(router);
  }

  const port = 8080;

  

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  return app;
}

module.exports = { createExpressApp };
