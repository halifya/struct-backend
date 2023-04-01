const express = require('express')

const app = express()
const config = require('./configs/app')
const https = require('http')
const fs = require('fs')
const credentials = {
  key: fs.readFileSync('inetcoth.key'),
  cert: fs.readFileSync('inetcoth.crt')
}


// Express Configs
require('./configs/express')(app)


// Middleware
require('./configs/middleware');

// Routes
app.use(require('./routes'));

// Error handler
require('./configs/errorHandler')(config.isProduction, app);


const serverHTTP = https.createServer(credentials, app)



const server = serverHTTP.listen(config.port, () => {
  const host = server.address().address
  const { port } = server.address()
  console.log(`Server is running at http://${host}:${port}`)
})
