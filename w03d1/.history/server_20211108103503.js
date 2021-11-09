const http = require('http');

const port = 8081;

const server = http.createServer( (req,res)=>{

  console.log('req:',req);

  if (req.url === '/'){
    res.send('Hello, World!');
  }

} );

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
