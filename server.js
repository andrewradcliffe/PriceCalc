const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// render page
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/myWebPage.html');
});

// get req for price calc
app.get('/calcprice', function(req, res) {
    // get params
    var s = req.query.salary;
    var d = req.query.days;

    console.log("salary: " + s);
    console.log("days: " + d);

    // calc final price
    let finalPrice = 0;
    dailyRate = s/365;
    finalPrice = dailyRate * d;

    // create object and send to client
    var obj = {finalPrice: finalPrice};
    console.log(JSON.stringify(obj));
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(obj));
})

app.post('/storequote', function(req, res) {
    console.log("POST request received")
    // get object
    let name = req.body.name
    let salary = req.body.salary
    let days = req.body.days
    res.send("Quote " + name + " stored successfully")
})

app.listen(8080);