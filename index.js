require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const ConnectDB = require("./config/db")
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
ConnectDB()

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

//logger
app.use(morgan('dev'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// routes
app.use('/',require('./routes/index'))
app.use('/api/',require('./routes/api'))


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
