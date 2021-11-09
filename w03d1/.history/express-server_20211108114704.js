const express = require('express');
const port = 8082;

const app = express();

app.set('view engine','ejs');

app.get('/',(req,res)=>{
  console.log('this is the homepage');
  // res.send('This Is The Homepage!');
  res.status(404).render('index');
});

app.get('*', (req,res)=>{
  res.render('404');
});

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
});
