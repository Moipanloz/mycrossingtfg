const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
var whitelist = ['https://mycrossing.herokuapp.com'];
var corsOptions = {
  origin: function (origin, callback){
    if(whitelist.indexOf(origin) != -1){
      callback(null, true);
    }else {
      callback(new Error('No permitido por CORS'));
    }
  }
}
app.options('*', cors());

app.use(express.static(__dirname + '/dist/my-crossing'));

app.get('/*', cors(corsOptions), function(req,res){
  const fullPath = path.join(__dirname + '/dist/my-crossing/index.html');
  console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
})

app.listen(process.env.PORT || 8080);
console.log('Server started running..');
