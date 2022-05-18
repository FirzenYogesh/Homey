import express from "express";
const web = express();
import database from "../../database";

web.get("/", (req, res) => {
	res.send("hello");
});

/**
 * Create new section
 */
web.post("/", (req, res) => {
	
});

module.exports = web;
