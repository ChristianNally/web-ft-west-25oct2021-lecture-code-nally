const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8081;

const server = http.createServer( (req,res)=>{

//  console.log('req:',req);

  console.log('method:',req.method);
  console.log('path:',req.url);
  const route = `${req.method} ${req.url}`;
  console.log('route:', route);


  switch(route){
    case 'GET /':
      res.write('Hello, World!');
      res.end();
      break;
    case 'GET /about':
      res.write('This is the ABOUT page');
      res.end();
      break;
    default:
      res.write('404 : Not Found');
      res.end();
      break;
  }

} );

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
