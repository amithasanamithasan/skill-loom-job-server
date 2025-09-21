
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require("dotenv");
const { Query } = require("mongoose");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1gieptu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        const jobsColletion = client.db('skillserver').collection('jobs')
        const bidssColletion = client.db('skillserver').collection('bids')
        // Connect the client to the server	(optional starting in v4.7)
        // Get add jobs data from db

        app.get('/jobs', async (req, res) => {
            const result = await jobsColletion.find().toArray();
            console.log(result);
            res.send(result);
        });

        app.get('/job/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await jobsColletion.findOne(query);
            res.send(result);
        })


        // await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
// Root route
app.get("/", (req, res) => {
    res.send("Skill Loom Job Portal API is running");
});


// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
});

