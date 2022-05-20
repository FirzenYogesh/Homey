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
	after(() => database.destroy());

	describe("pages table test", () => {
		it("should have default value", () => {
			database
				.table("pages")
				.where({ name: "/", id: 1 })
				.select("id", "name")
				.first()
				.then((result) => {
					expect(result).not.to.be.null;
					it("name is /", () => {
						expect(result.name).not.to.be.null;
						expect(result.name).to.equal("/");
					});
					it("id is 1", () => {
						expect(result.id).not.to.be.null;
						expect(result.id).to.equal(1);
					});
				});
		});
	});
});
