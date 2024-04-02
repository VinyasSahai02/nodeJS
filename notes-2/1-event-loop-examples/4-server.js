const http = require('http')

const server = http.createServer((req, res) => {
  console.log('request event')
  res.end('Hello World')
})

server.listen(5000, () => {
  console.log('Server listening on port : 5000....')
})

//Server listening on port : 5000....
//everytime we reload localhost:5000 (ie. we req again)-->request event
//hello world (in browser)