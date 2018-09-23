const express = require('express');

const app = express();

app.get('/', (request) => {
  request.send('Works');
});

app.listen(3000);
