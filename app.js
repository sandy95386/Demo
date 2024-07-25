require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");


// Import the database connection module
const { connectToDatabase } = require("./Server/Database/db");

//import routers
const userRouter = require('./Server/routes/userRouter'); 
const saveRouter  = require('./Server/routes/saveRouter')
const scanRouter = require('./Server/routes/scanRouter')
const editorRouter = require('./Server/routes/editorRouter')
const uploadRouter = require('./Server/routes/uploadRouter')
const staticRoutes = require('./Server/routes/staticRoutes'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Connect to the database
connectToDatabase();

//login path
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Client/component/login.html");
});
app.use("/", express.static(path.join(__dirname, "Client")));

// routes
app.use('/api', userRouter);
app.use('/api',saveRouter)
app.use('/api/',scanRouter)
app.use('/api/',editorRouter)
app.use('/api/',uploadRouter)
// Use the staticRoutes middleware for giving access to extenal style and js
app.use('/', staticRoutes);


// Set Port & Host
const port = process.env.APP_PORT || 3001;
const host = process.env.APP_HOST || '127.0.0.1';

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});





