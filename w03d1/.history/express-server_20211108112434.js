const express = require('express');
const port = 8082;

const app = express();

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
});