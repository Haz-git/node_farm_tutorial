//Require Modules:
const fs = require('fs');
const http = require('http');
const url = require('url');

//Top-level code: This is a sync function is executed once. This is to prevent users from cause re-reading of file per refresh.

//__dirname is the directory where this (index.js) current file is located.
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//Server:

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview.');
    } else if (pathName === '/product') {
        res.end('These are the products');
    } else if (pathName === '/api') {
        //We need to tell browser that we're sending back JSON:
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'personal-header-test': 'Hello!'
        });

        res.end('<h1>404: Page Not Found!</h1>');
        //Browser able to parse h1 because text/html is defined in header.
    }
})

server.listen(8000, 'localhost', () => {
    console.log('The server is listening...');
})