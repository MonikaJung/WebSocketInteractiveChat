// import http and ws modules
const http = require("http");
const websocket = require("ws");

// create an http and a websocket servers
const server = http.createServer((req, res) => {
  res.end("I am connected");
});
const wss = new websocket.Server({ server });

// call a method 'on' of websocket object
wss.on("headers", (headers, req) => {
  // logg the header to the console
  console.log("WebSocket.on headers:\n");
  console.log(headers);
});
console.log("Listening on http://localhost:8000 ...");
// listen to port 8000
server.listen(8000);

// ------- Event: 'connection' ---------
wss.on("connection", (ws, req) => {
  ws.send("Welcome, your connection is ready");
  //receive the message from client on Event: 'message'
  ws.on("message", (msg, isBinary) => {
    console.log("Received message from client:");
    const message = isBinary ? msg : msg.toString();
    console.log(message);
  });
});

