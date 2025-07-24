const http = require('http');
const fs = require('fs');
const url = require('url');

//this callback func is responsible for handling the incoming request 
function myHandler(req, res) {
    const myUrl = url.parse(req.url, true);
    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case '/':
                if (req.method === 'GET') res.end("Home Page");
                break;
            case '/about':
                const userName = myUrl.query.name;
                res.end(`Hello ${userName}`);
                break;
            default:
                res.end("404 Not Found");
        }
    })
}

const mySever = http.createServer(myHandler);

mySever.listen(3000, () => {
    console.log('Server is running on port 3000');
})

//problems:
//1. need to make a case for every route
//2. for every route we need to handle http methods differently
//3. we are using diff modules for parsing url and writing to file(when we will use Headers, Json etc we will need to use more modules)