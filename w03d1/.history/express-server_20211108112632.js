const express = require('express');
const port = 8082;

const app = express();

app.get('/',(req,res)=>{
  console.log('this is the homepage');
});

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
});
