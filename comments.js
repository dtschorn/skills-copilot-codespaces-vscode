// Create Web Server
// Create a web server that listens on port 3000.
// The web server responds to any request to the server root with a web page that displays the following:
// The title "Comments"
// A list of at least 5 comments. Each comment has an author and a message.
// The web server must be created in a file named comments.js
// The comments must be stored in a separate file named comments.json
// Use the fs module to read the comments from the comments.json file
// Use the http module to create the web server
// Use the fs module to serve the web page
// Use the path module to resolve the file paths

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.resolve(__dirname, 'comments.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }

    const comments = JSON.parse(data);
    const commentsHtml = comments.map(comment => `<li>${comment.author}: ${comment.message}</li>`).join('');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Comments</title>
        </head>
        <body>
          <h1>Comments</h1>
          <ul>${commentsHtml}</ul>
        </body>
      </html>
    `);
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
