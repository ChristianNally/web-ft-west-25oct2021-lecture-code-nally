const express = require('express');
const port = 8082;

const app = express();

app.set('view engine','ejs');

app.get('/',(req,res)=>{
  console.log('this is the homepage');
  // res.send('This Is The Homepage!');
  res.render('index');
});

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
});
