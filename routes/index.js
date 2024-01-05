const express = require('express')
const router = express.Router()

// Initialize model
let Url = require("../models/UrlShortener")

router.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

module.exports = router