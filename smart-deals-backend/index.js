const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;

// middleware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://nazmul:3HOxWTBW19yE5pgL@cluster0.0zyxsoe.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


app.get('/', (req,res) => {
    res.send('This is server')
})


const run = async () => {
    try{
        await client.connect()

        await client.db("admin").command({ping: 1})
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{}
}
run().catch(console.dir)

app.listen(port, () => {
    console.log(`Server is running on this port ${port}`);
})