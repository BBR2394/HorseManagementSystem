var express = require('express');
var horseManagement = express.Router();

var pgsql_pool = require('../session/database.js')

horseManagement.post('/movehorse', function (req, res) {
    console.log("POST /move");
});