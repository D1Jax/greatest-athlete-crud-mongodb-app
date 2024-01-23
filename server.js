require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://jaxthoirs93:'+process.env.MONGODB_PASSWORD+'@cluster0.u5kbrpy.mongodb.net/?retryWrites=true&w=majority'


const PORT = 6969


app.use(cors());
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('best-athletes')
    const list = db.collection('best-athletes')



app.get("/", (req, res)=>{


    list.find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))

})

app.post('/athletes', (request, response) => {
    list.insertOne({name: request.body.athlete,
    event: request.body.event,pb: request.body.pb,likes: 0})
    .then(result => {
        console.log('athlete added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    list.updateOne({name: String(request.body.athleteName), event: String(request.body.eventName), pb: String(request.body.pb)}, {
        $inc: {
            likes: 1
        }
    }, {
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteAthlete', (request, response) => {
    list.deleteOne({name: request.body.athleteName, event: request.body.eventName})
    .then(result => {
        console.log('Athlete Deleted')
        response.json('Athlete Deleted')
    })
    .catch(error => console.error(error))
})
})
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})