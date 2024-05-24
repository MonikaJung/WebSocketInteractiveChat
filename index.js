//importing http module
const http = require('http');
//importing ws module
const websocket = require('ws');
//creating a http server
const server = http.createServer((req, res) => {
res.end("I am connected");
});
//creating websocket server
const wss = new websocket.Server({ server });
//calling a method 'on' which is available on websocket object
wss.on('headers', (headers, req) => {
//logging the header
console.log('WebSocket.on headers:\n');
console.log(headers);
});
console.log('Listening on http://localhost:8000 ...');
//making it listen to port 8000
server.listen(8000);
