const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send('Home Page');
})

app.get('/about', (req, res) => {  // about?name=John
    return res.send(`Hello ${req.query.name}`); //
})


app.listen(3000, () => {console.log("Connected to server")})


//VERSIONING
// ^4.18.3
// 3rd part (3) - minor fixes (optional)
// 2nd part (18) - recommended bug fix/recommended update
// 1st part (4) - major release
// (^) - install all recommended and minor fixes automatically
//  means 4 ko change nhi karna || we can use version from 4.18.2 to 5.0.0(excluding) --> npm will auto update it whenever we call npm install

// ~4.18.3
// (~) - install all minor fixes automatically . can use version from 4.18.2 to 4.19.0(excluding)