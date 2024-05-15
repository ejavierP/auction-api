const express = require("express");

function createExpressApp(routers) {
  let app = express();

  app.use(express.json());

  for (let router of routers) {
    app.use(router);
  }

  const port = 8080;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  return app;
}

module.exports = createExpressApp;
