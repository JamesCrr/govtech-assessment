const http = require('http');

function createServer() {
  return http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (req.url === '/time') {
      const currentTime = new Date().toISOString();
      res.end(`Current server time: ${currentTime}\n`);
    } else {
      const msg = 'Hello Node!\n'
      res.end(msg);
    }
  });
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  const server = createServer();
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

module.exports = { createServer };
