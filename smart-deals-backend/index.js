const express = require("express")
const cors = require("cors")
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
var jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 3000;


const serviceAccount = require("./smart-deals-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// middleware
app.use(cors())
app.use(express.json())

const verifyFirebaseToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" })
  }

  const token = req.headers.authorization.split(' ')[1]
  console.log("received token:", token, "length:", token?.length);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access1" })
  }

  // verify token
    try {
    const userInfo = await admin.auth().verifyIdToken(token);
    req.token_email = userInfo.email;
    console.log("✅ Token validated for:", userInfo.email);
    next();
  } catch (error) {
    console.log("❌ Invalid token:", error.message);
    return res.status(401).send({ message: "Unauthorized access" });
  }

}

const veryJWTToken = (req, res, next) => {
  console.log("in middleware" , req.headers);

  const authorization = req.headers.authorization
  if(!authorization) {
    return res.status(401).send({message: 'unauthorized access'})
  }

  const token = authorization.split(' ')[1]
  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
    if(err){
      return res.status(401).send({massage: 'unauthorized access'})
    }

    console.log('after decoded' ,decoded);
    req.token_email = decoded.email

    

    next()
  })

  
}

// const uri = "mongodb+srv://nazmul:3HOxWTBW19yE5pgL@cluster0.0zyxsoe.mongodb.net/?appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0zyxsoe.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


app.get('/', (req, res) => {
  res.send('This is server')
})


const run = async () => {
  try {
    await client.connect()

    const dealsDB = client.db("dealsDB")
    const dealsCollection = dealsDB.collection('product')
    const userCollection = dealsDB.collection('user')
    const bidsCollection = dealsDB.collection('bids')

    // jwt api
    app.post('/getToken', (req,res) => {
      const loggedUser = req.body;
      console.log(loggedUser);
      
      const token = jwt.sign(loggedUser , process.env.JWT_SECRET , {expiresIn: '1h'})
      res.send({token: token})
    })

    // users location set 
    app.get("/users", async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // users add to server
    app.post('/users', async (req, res) => {
      const newUser = req.body
      const result = await userCollection.insertOne(newUser)
      res.send(result)
    })


    // product location set 
    app.get('/products', async (req, res) => {
      const cursor = dealsCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // product add to server
    app.post("/products", async (req, res) => {
      const newProduct = { ...req.body, created_at: new Date() }
      const result = await dealsCollection.insertOne(newProduct)
      res.send(result)
    })

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await dealsCollection.findOne(query)
      res.send(result)
    })



    app.get('/latest-products', async (req, res) => {
      const cursor = dealsCollection.find().sort({
        created_at: -1
      }).limit(6)
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/bids', veryJWTToken, async(req,res) => {
      // console.log('headers', req.headers);
      
      const email = req.query.email;
      const query = {}
      if(email){
        query.buyer_email = email;
      }

      // ?verify user have access ti see this data
      if(email !== req.token_email){
        return res.status(401).send({message: 'unauthorized access'})
      }
      const cursor = bidsCollection.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    // bit related apis with firebase token verify
    // app.get('/bids', verifyFirebaseToken, async (req, res) => {
    //   const email = req.query.email;
    //   const query = {}
    //   if (email) {
    //     if(email !== req.token_email){
    //       return res.status(403).send({message: "Forbidden "})
    //     }
    //     query.buyer_email = email
    //   }
    //   const cursor = bidsCollection.find(query)
    //   const result = await cursor.toArray()
    //   res.send(result)
    // })

    app.get('/products/bids/:productId', verifyFirebaseToken, async (req, res) => {
      const product = req.params.productId;
      const query = { productId: product }
      const cursor = bidsCollection.find(query).sort({ bid_price: -1 })
      const result = await cursor.toArray()
      res.send(result)
    })

    // all bids
    app.get('/allBids', async (req, res) => {
      const cursor = bidsCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/bids', async (req, res) => {
      const newBid = req.body
      const result = await bidsCollection.insertOne(newBid)
      res.send(result)
    })

    // delete api
    app.delete('/bids/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await bidsCollection.deleteOne(query)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  finally { }
}
run().catch(console.dir)

app.listen(port, () => {
  console.log(`Server is running on this port ${port}`);
})