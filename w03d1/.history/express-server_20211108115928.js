const express = require('express');
const morgan = require('morgan');
const port = 8082;

const app = express();

app.set('view engine','ejs');

// middleware
app.use(morgan('tiny'))



app.get('/',(req,res)=>{
  console.log('this is the homepage');
  // res.send('This Is The Homepage!');
  const date = Date.now();
  const templateVars = {
    dynamicValue: date
  };
  res.status(200).render('index',templateVars);
});

app.get('*', (req,res)=>{
  res.status(404).render('404');
});

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
});
