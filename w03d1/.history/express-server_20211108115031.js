const express = require('express');
const port = 8082;

const app = express();

app.set('view engine','ejs');

app.get('/',(req,res)=>{
  console.log('this is the homepage');
  // res.send('This Is The Homepage!');
  const date = Date.now();
  res.status(200).render('index');
});

app.get('*', (req,res)=>{
  res.status(404).render('404');
});

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
});
