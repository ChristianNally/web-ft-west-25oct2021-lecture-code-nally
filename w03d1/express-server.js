const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8082;

const app = express();

app.set('view engine','ejs');

// middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

//
// routes
//

app.get('/',(req,res)=>{
  console.log('this is the homepage');
  // res.send('This Is The Homepage!');
  const date = Date.now();
  const templateVars = {
    dynamicValue: date
  };
  res.status(200).render('index',templateVars);
});

app.get('/form',(req,res)=>{
  res.status(200).render('form');
});

app.post('/', (req,res)=>{
  console.log('form input:', req.body);
  const templateVars = {
    dynamicValue: req.body.password
  };
  res.render('index',templateVars);
});

app.get('*', (req,res)=>{
  res.status(404).render('404');
});

app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`);
});
