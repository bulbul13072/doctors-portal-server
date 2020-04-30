const express  = require('express');
const app = express(); 
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
var firebase = require('firebase/app');
// require('firebase/auth');
require('firebase/database');

  const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectID,
  storageBucket: process.env.storeBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appID
};
firebase.initializeApp(config);
// var database = firebase.database();
app.use(cors());
app.use(bodyParser.json());

var db = firebase.database();
var usersRef = db.ref("appointment");

app.get('/', function (req, res) {

res.send("Yo brother! I can do firebase rest server");
  
});

// app.get('/appointments', function (req, res) {
//   res.sendfile('./index.html')
// })

app.post('/setAppointment', function(req, res) {
  // var userEmail = req.body.user_email;
      var data = req.body;
      usersRef.push(data, function(err) {
     if (err) {
       res.send(err)
     } else {
       // var key = Object.keys(snapshot.val())[0];
       // console.log(key);
       res.json({message: "Success: Your appointment has been scheduled.", result: true});
     }
   });
});

app.post('/appointments', function(req, res) {
  var uid = "-M64LHvSEaUhiw6hwg";
if (uid.length != 18) {
  res.json({message: "Error: uid must be 18 characters long."});
} else {
  usersRef.once("value", function(snapshot) {
    //console.log(snapshot);
    if (snapshot.val() == null) {
      res.json({message: "Error: No user found", "result": false});
    } else {
      res.json({"message":"successfully fetch data", "result": true, "data": snapshot.val()});
    }
  });
}
});

const port = process.env.port || 4200;

app.listen(port, () => console.log(`Doctors Portal : listening at http://localhost:${port}`));