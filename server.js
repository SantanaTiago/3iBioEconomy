const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path')
const router = require('./routes/margaridos-router')
const app = express()
const http = require("http")
const socketIo = require("socket.io")
const nodemailer = require('nodemailer');
const creds = require('./config/mail');
const { loadData } = require("./loadDataStartup");
const {getUpsertChangeStream, getDeleteChangeStream} = require("./change-identifier");
const {saveResumeTaken} = require("./token-provider");


(async function() {

  var transport = {
    host: 'yourEmailProvider.com', // e.g. smtp.gmail.com
    port: 465,
    secure: true,
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  }

  var transporter = nodemailer.createTransport(transport)

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('All works fine, congratz!');
    }
  });

  // Bodyparser middleware
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

  // DB Config
  const db = require("./config/keys").mongoURI;

  // Connect to MongoDB
  mongoose
    .connect(
      db,
      { useNewUrlParser: true, dbName: 'margaridos' }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

  // Routes
  app.use('/api', router)

  // Passport middleware
  app.use(passport.initialize());

  // Passport config
  require("./config/passport")(passport);

  // app.use(express.static(path.join(__dirname, 'client/build')));

  // app.get('*', (req, res)=>
  //   {  res.sendFile(path.join(__dirname = 'client/build/index.html'));
  // })

  // var alertData=[]
  // fetchAlertData = (await loadData());
  // if(fetchAlertData.success==true){
  //   alertData=fetchAlertData.data;
  //   console.log(alertData);
  // }



const server = http.createServer(app);
const io = socketIo(server);

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 4000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });

  socket.on("intervalData", (msg) => {
    if(typeof msg == "number"){
      console.log(msg);
    }
    else{
      console.log("Não é numero");
    }
  });

  socket.on("getInterval", () => {
    console.log("entrou");
    socket.emit("Interval", 40000);
  });
});

function findAndReplaceOrAdd(object, dataObject, value, replacevalue) {
  for (var x in object) {
    if (object[x]._id == value) { 
      object[x].data = replacevalue;
      return; 
    }
  }
  object.push(dataObject);
}

const upsertChangeStream = await getUpsertChangeStream();
  upsertChangeStream.on("change", async change => {
    console.log("Pushing data to array of alerts with id", change.fullDocument._id);
    findAndReplaceOrAdd(alertData, change.fullDocument, change.fullDocument._id, change.fullDocument.data);
    await saveResumeTaken(change._id, "SOME_UPSERT_TOKEN_ID");
  });
  
  upsertChangeStream.on("error", error => {
    console.error(error);
  });

const deleteChangeStream = await getDeleteChangeStream();
  deleteChangeStream.on("change", async change => {
    console.log("Deleting data from array of alerts with id", change.documentKey._id);
    const index = alertData.findIndex(x => x._id === change.documentKey._id);
    if (index !== undefined){
      standardRatingArray.splice(index, 1);
    }
    await saveResumeTaken(change._id, "SOME_DELETE_TOKEN_ID");
  });
  
  deleteChangeStream.on("error", error => {
    console.error(error);
  });


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server up and running on port ${port} !`));

})();