// import dotEnv from "dotEnv";
// dotEnv.config();

// import { expect } from "chai";
// import "mocha";
// import sqlite3 from "../../database/sqlite";
// import _ from "lodash";

// import config from "config";
// import { TABLE_NAME as PagesTableName } from "../../database/sqlite/pages";
// import { TABLE_NAME as SectionsTableName } from "../../database/sqlite/sections";

// describe("sqlite database primary tests", () => {
// 	it("path should be set correctly", () => {
// 		expect(config.get("database.path")).to.equal(process.env.DATABASE_PATH);
// 	});

// 	const sqliteDriver = new sqlite3();
// 	it("connect to database", (done) => {
// 		sqliteDriver.connect((err: Error, res: any) => {
// 			expect(err).to.be.null;
// 			expect(sqliteDriver.isConnected()).to.be.true;
// 			done();
// 		});
// 	});

// 	it("migrate tables", (done) => {
// 		sqliteDriver.migrate((err: Error, res: any) => {
// 			expect(err).to.be.null;
// 			done();
// 		});
// 	});

// 	it("close database", (done) => {
// 		sqliteDriver.close((err: Error, res: any) => {
// 			expect(err).to.be.null;
// 			done();
// 		});
// 	});
// });

// describe(`table ${PagesTableName} test`, () => {
// 	const sqliteDriver = new sqlite3();

// 	it("connect to database", (done) => {
// 		sqliteDriver.connect((err: Error, res: any) => {
// 			expect(err).to.be.null;
// 			expect(sqliteDriver.isConnected()).to.be.true;
// 			done();
// 		});
// 	});

// 	it(`${PagesTableName} default records set`, (done) => {
// 		let table = sqliteDriver.pages();
// 		expect(table).not.to.be.null;
// 		table.defaultRecordExists((err: Error, result: any) => {
// 			it("table parameter exists", () => {
// 				expect(result.table).not.to.be.null;
// 				expect(result.table).to.be.string;
// 			});
// 			it("table default record set properly", () => {
// 				expect(result.id).to.be.equal(1);
// 				expect(result.name).to.be.equal("/");
// 			});
// 			done();
// 		});
// 	});

// 	it("close database", (done) => {
// 		sqliteDriver.close((err: Error, res: any) => {
// 			expect(err).to.be.null;
// 			done();
// 		});
// 	});
// });

// describe(`table ${SectionsTableName} test`, () => {
// 	const sqliteDriver = new sqlite3();

// 	it("connect to database", (done) => {
// 		sqliteDriver.connect((err: Error, res: any) => {
// 			expect(err).to.be.null;
// 			expect(sqliteDriver.isConnected()).to.be.true;
// 			done();
// 		});
// 	});

// 	it(`table ${SectionsTableName} records set`, (done) => {
// 		let table = sqliteDriver.sections();
// 		expect(table).not.to.be.null;
// 		table.defaultRecordExists((err: Error, result: any) => {
// 			it("table parameter exists", () => {
// 				expect(result.table).not.to.be.null;
// 				expect(result.table).to.be.string;
// 			});
// 			it("table default record set properly", () => {
// 				expect(result.id).to.be.equal(1);
// 				expect(result.name).to.be.equal("/");
// 				expect(result.pageId).to.be.equal(1);
// 			});
// 			done();
// 		});
// 	});

// 	it("close database", (done) => {
// 		sqliteDriver.close((err: Error, res: any) => {
// 			expect(err).to.be.null;
// 			done();
// 		});
// 	});
// });
