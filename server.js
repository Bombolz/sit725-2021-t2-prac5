let express = require("express");
let app = express();

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

let http = require('http').createServer(app);
let io = require('socket.io')(http);

const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
//const { MongoClient } = require('mongodb');
var mongoose = require('mongoose');

var port = process.env.PORT || 8080;


app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log("New user posted")
  console.log('body', req.body)
  let user = req.body;
  insertUser(user, res)
})

const userSchema = {
  first_name: String,
  last_name: String,
  mobile: String,
  email: String
}

const User = mongoose.model("User", userSchema);

app.get('/',(req,res)=>{
  console.log('Users requested')
  // get projects from database
  getUsers(res)
})

app.post('/api/projects', function(req, res) {
  console.log("New user posted")
  console.log('body', req.body)
  let user = req.body;
  insertUser(newUser, res)
})

//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);

});

http.listen(port, () => {
  console.log("Listening on port ", port);
});

console.log('Server listening on port ' + port)

//Database connection
const uri = "mongodb+srv://admin:admin@cluster0.shxjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://admin:admin@cluster0.shxjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true }, { useUnifiedTopology: true })


//open connection
const openConnection = (message) => {
  client.connect(err => {
    usersCollection = client.db("myFirstDatabase").collection("users");
    // perform actions on the collection object
    //client.close();

    if (!err) {
      console.log('Database Connected')
    } else {
      console.log('[error]', err)
    }
  });
}

//insert user to db
const insertUser = (user, res) => {
  usersCollection.insertOne(user, (err, result) => {
    console.log('User inserted', result)
    //res.send({ result: "form submitted successfully" + user })
    res.send({user})
  })
}

//get users
const getUsers = (res) => {
  usersCollection.find().toArray(function (err, result) {
    if (err) throw err;
    res.send(result)
  })
}

openConnection()

