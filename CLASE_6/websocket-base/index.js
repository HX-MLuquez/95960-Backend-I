const { app, server_init } = require("./src/server");

const port = 3000;
server_init.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
