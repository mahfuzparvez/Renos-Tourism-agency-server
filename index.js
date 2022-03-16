const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();  /*It is noted for me ( ei link theke neya hoyse)https://www.npmjs.com/package/dotenv */
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wfh14.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db('tourism_Agency');
        const serviceCollection = database.collection('services');
        const orderCollection = database.collection('orders');
        app.get('/services', async (req, res) => {
            const cursor = serviceCollection.find({});
            // console.log(cursor);
            const services = await cursor.toArray();
            res.send(services);
            // console.log(services);
        });
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('touring start server');
});

app.listen(port, () => {
    console.log('server runnig at port', port)
})