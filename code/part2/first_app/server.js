let http = require("http");

function start() {
    http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello world");
      response.end();
    }).listen(8800);
}

exports.start = start

