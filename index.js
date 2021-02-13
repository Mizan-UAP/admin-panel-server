const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}>@cluster0.djtwh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.get('/', (req, res) => {
    res.send('hello db');
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("adminPanel").collection("addProduct");

    // send data to db
    app.post("/addItem", (req, res) => {
        const item = req.body;
        console.log(item);
        collection.insertOne(item)
            .then(result => {
                // res.send(result.insertedCount > 0)
                res.redirect('/')
            })
    })
    // client.close();
});



const PORT = 5000;

app.listen(process.env.PORT || PORT);