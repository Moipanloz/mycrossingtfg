const express = require('express');
var httpProxy = require('http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
//var cors = require('cors');

const app = express();
const path = require('path');
// app.use(cors());
// app.options('*', cors());

app.use(express.static(__dirname + '/dist/my-crossing'));


// Recoge todas las peticiones al servidor con '/api/' para
// redirigirlas al servicio del back
// var apiProxy = httpProxy.createProxyServer();
// app.all("https://mycrossing.herokuapp.com/api/*", function(req, res){
//   apiProxy.web(req, res, {target: apiForwardingUrl});
// });

// Proxy
app.use('/api', createProxyMiddleware({
  target: process.env.SERVER_BACK,
  changeOrigin: true,
  pathRewrite: {
    ['^/api']: '',
  },
}));

app.get('/*', function(req,res){
  const fullPath = path.join(__dirname + '/dist/my-crossing/index.html');
  console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
})

app.listen(process.env.PORT || 8080);
console.log('Server started running..');
