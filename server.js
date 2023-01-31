const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

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

app.listen(8080);