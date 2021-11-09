const http = require('http');
const port = 8081;

const server = http.createServer( (req,res)=>{

//  console.log('req:',req);

  console.log('method:',req.method);
  console.log('path:',req.url);
  const route = `${req.method} ${req.url}`;
  console.log('route:', route);

  if (req.url === '/'){
    res.write('Hello, World!');
    res.end();
  }

} );

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
