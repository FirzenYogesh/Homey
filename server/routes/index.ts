import express from "express";
const web = express();
web.use(express.static("public"));

web.use("/api/v1", require("./v1"));

module.exports = web;
