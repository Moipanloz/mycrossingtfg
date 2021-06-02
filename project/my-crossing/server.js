const express = require('express');
//var cors = require('cors');
const app = express();
const path = require('path');

// app.use(cors());
// app.options('*', cors());

app.use(express.static(__dirname + '/dist/my-crossing'));

app.get('/*', function(req,res){
  const fullPath = path.join(__dirname + '/dist/my-crossing/index.html');
  console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
})

app.listen(process.env.PORT || 8080);
console.log('Server started running..');
