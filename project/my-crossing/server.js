// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//       return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }

const express = require('express');
const app = express();
//app.use(requireHTTPS);

app.use(express.static('./dist/my-crossing'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/my-crossing/'}),
);


app.listen(process.env.PORT || 8080);
console.log('Node server running on port 8080');


// const http = require('http');

// // Create an instance of the http server to handle HTTP requests
// let app = http.createServer((req, res) => {
//     // Set a response type of plain text for the response
//     res.writeHead(200, {'Content-Type': 'text/plain'});

//     // Send back a response and end the connection
//     res.end('Hello World!\n');
// });

// // Start the server on port 3000
// app.listen(3000, '127.0.0.1');
// console.log('Node server running on port 3000');
