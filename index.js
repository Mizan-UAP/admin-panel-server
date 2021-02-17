const express = require('express')

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb+srv://newUser:ZB2lrkRjffilgZ6I@cluster0.djtwh.mongodb.net/adminPanel?retryWrites=true&w=majority";




app.get('/', (req, res) => {
    res.send('hello db');
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("adminPanel").collection("addProduct");

    // send data to db
    app.post("/addItems", (req, res) => {
        const item = req.body;
        console.log(item);
        collection.insertOne(item)
            .then(result => {
                res.send(result.insertedCount > 0)

            })
    })

    //Getting Data from db 
    app.get('/items', (req, res) => {
        collection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    //delete one from db
    app.delete('/delete/:id', (req, res) => {
        console.log(req.params.id);
        collection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.send(result)
                console.log(res.send);
            })
             console.log(ObjectId(req.params.id));
    })
    // client.close();
});



const PORT = 5000;

app.listen(process.env.PORT || PORT);