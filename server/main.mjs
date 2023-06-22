import http from 'http';

// the host and port to listen on
const host = 'localhost';
const port = 8080;

// requestListener is a function which is automatically added to the 'request' event
// requestListener is called each time a request is made to the server
const requestListener = (req, res) => {

  // req is an http.IncomingMessage, which is a Readable Stream
  // res is an http.ServerResponse, which is a Writable Stream
  // This makes Node.js fast by default. In contrast, PHP and Ruby are blocking by default.
  // Blocking means that the server waits for each operation to complete 
  // (like reading from a file, or querying a database) before continuing to process other req.
  
  // Non-blocking means that the server can process other req while 
  // the file is being read or the database is being queried.
  
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
  } else {
    res.writeHead(404);
    res.end('Not Found\n');
  }
};

// the server is created, but not started
const server = http.createServer(requestListener);

// the server is now started, listening for requests on port 8080
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  });
