import express from "express";
const web = express();

web.get("/", (req, res) => {
	res.send("hello");
});

web.use("/section", require("./section"));

module.exports = web;
