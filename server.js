const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";

// create new MongoClient
const client = new MongoClient(uri);
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
    let n = req.body.name
    let s = req.body.salary
    let d = req.body.days

    // connect to db and store quote
    async function run() {
        try {
            // insert one item
            let dbo = client.db("mydb");
            let myobj = {quoteName: n, salary: s, days: d};
            await dbo.collection("quotes").insertOne(myobj, function(err, res) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log("1 quote inserted")
            });
            console.log("End the database")
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);

    // calc final price and send response
    let finalPrice = 0;
    dailyRate = s/365;
    finalPrice = dailyRate * d;

    // create object and send to client
    var obj = {finalPrice: finalPrice, console: "Quote " + n + " stored successfully"};
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(JSON.stringify(obj));
})

app.listen(8080);