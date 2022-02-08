const express = require('express');
const router = express.Router();
const app = express();
const port = 8001;
const bodyParser = require('body-parser');




app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err) throw err;
    console.log('server is running on port '+port);
});