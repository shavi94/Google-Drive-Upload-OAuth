const express = require('express')
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/upload', (req, res) => {
    res.sendFile(__dirname + '/public/upload.html');
});

app.listen(9000, () => {
  console.log('Example app listening on port 9000!')
});