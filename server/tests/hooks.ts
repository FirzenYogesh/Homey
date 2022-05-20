import dotEnv from "dotEnv";
dotEnv.config();

import { database } from "../database";

exports.mochaHooks = {
	afterAll: (done) => {
		database.destroy().finally(() => done());
	},
};
