const { server_init } = require('./src/server')
const PORT = 3000

server_init.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})
