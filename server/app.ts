import express from "express";
import dotEnv from "dotEnv";

dotEnv.config();

const app = express();

const port = process.env.PORT || 7050;
import database from "./database";
import async from "async";

async function start() {
	async.waterfall([database.connect], (err: Error, result: boolean) => {
		if (err || !result) {
			console.error("An error has occured", err, result);
			process.exit(1);
		} else {
			app.use(require("./routes"));
			app.listen(port, () => {
				console.info("We are live on " + port);
			});
		}
	});
}

start();
