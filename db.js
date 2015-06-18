var databaseURI = "vgi";
var collections = ["pages"];
var mongojs = require("mongojs");
var db = mongojs(databaseURI, collections);

module.exports = db;