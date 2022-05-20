import dotEnv from "dotEnv";
dotEnv.config();

import { expect } from "chai";
import "mocha";
import sqlite3 from "../../database/sqlite";
import _ from "lodash";

import config from "config";

import { database } from "../../database";

describe("database tests", () => {
	it("should be initialized", () => {
		expect(database).not.to.be.null;
	});
});

describe("pages table test")