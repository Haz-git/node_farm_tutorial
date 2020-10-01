//Require Modules:
const fs = require('fs');
const http = require('http');
const url = require('url');

//Server:

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview.');
    } else if (pathName === '/product') {
        res.end('These are the products');
    } else if (pathName === '/api') {
        //__dirname is the directory where this (index.js) current file is located.
        fs.readFile('${__dirname}/dev-data/data.json');

        res.end('api');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'personal-header-test': 'Hello!'
        });

        res.end('<h1>404: Page Not Found!</h1>');
        //Browser able to parse h1 because text/html is defined in header.
    }
})