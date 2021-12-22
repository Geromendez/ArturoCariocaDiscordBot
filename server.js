console.log("1server");
const express = require('express');
const server = express();
 console.log("2server");
server.all('/', (req, res) => {
  res.send(`OK`)
})
 console.log("3server");
function keepAlive() {
  console.log("4server");
  server.listen(3000, () => { console.log("Server is Ready!!" + Date.now()) });
}
 
module.exports = keepAlive;

