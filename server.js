const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/' && req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'text/palin'});
        res.end('Welcome to the homepage!');

    }else if (req.url === '/about'&&req.method === 'GET'){
        res.writeHead(200,{'Content-Type':'text/palin'});
        res.end('About us page');
    }else {
        res.writeHead(404,{'Content-Type':'text/palin'});
        res.end('Page not found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{console.log(`Server running at http://localhost:${PORT}/`)})