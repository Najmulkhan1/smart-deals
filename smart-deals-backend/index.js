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

        const dealsDB = client.db("dealsDB")
        const dealsCollection = dealsDB.collection('product')
        const userCollection = dealsDB.collection('user')

        // users location set 
        app.get("/users", async (req,res) => {
          const cursor = userCollection.find()
          const result = await cursor.toArray()
          res.send(result)
        })

        // users add to server
        app.post('/users', async(req, res) => {
          const newUser = req.body
          const result = await userCollection.insertOne(newUser)
          res.send(result)
        })


        // product location set 
        app.get('/products', async (req,res) => {
          const cursor = dealsCollection.find()
          const result = await cursor.toArray()
          res.send(result)
        })

        // product add to server
        app.post("/products", async (req,res) => {
          const newProduct = {...req.body, created_at: new Date()}
          const result = await dealsCollection.insertOne(newProduct)
          res.send(result)
        })

        app.get('/latest-products', async (req, res) => {
          const cursor = dealsCollection.find().sort({
            created_at: -1
          }).limit(6)
          const result = await cursor.toArray()
          res.send(result)
        })

        await client.db("admin").command({ping: 1})
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{}
}
run().catch(console.dir)

app.listen(port, () => {
    console.log(`Server is running on this port ${port}`);
})