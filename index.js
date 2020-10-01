//Require Modules:
const fs = require('fs');
const http = require('http');
const url = require('url');

//Top-level code: This is a sync function is executed once. This is to prevent users from cause re-reading of file per refresh.

//__dirname is the directory where this (index.js) current file is located.
//We are synchronously reading our html templates here.
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

//Server:

const server = http.createServer((req, res) => {
    const pathName = req.url;

    //Overview Page:

    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end(tempOverview);

    //Product Page:

    } else if (pathName === '/product') {
        res.end('These are the products');

    //API:

    } else if (pathName === '/api') {
        //We need to tell browser that we're sending back JSON:
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);

    //Not Found:
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