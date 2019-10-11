import http from "http";

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello Dave\n");
  })
  .listen(1337, "127.0.0.1");

console.log("GTG at http://127.0.0.1:1337/");

export default server;
