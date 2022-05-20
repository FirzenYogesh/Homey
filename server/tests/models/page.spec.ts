import dotEnv from "dotEnv";
dotEnv.config();

import { expect } from "chai";
import "mocha";

import { PageTable } from "../../models/page";

describe("pages table test", () => {
	it("default page exists", (done) => {
		const pages = new PageTable();
		pages.findPageById(1).then((result) => {
			expect(result).not.to.be.null;
			expect(result.name).to.equal("/");
			done();
		});
	});

	it("should create a pages", (done) => {
		const pages = new PageTable();
		pages
			.addPages([
				{
					name: "/test",
					title: "test",
				},
				{
					name: "/test1",
					title: "test1",
				},
				{
					name: "/test2",
					title: "test2",
				},
			])
			.then((addedRows) => {
				expect(addedRows).not.to.be.null;
			})
			.catch((err: Error) => {
				expect(err).to.be.null;
			})
			.finally(() => {
				done();
			});
	});

	it("should have 4 rows after insertion", (done) => {
		const pages = new PageTable();
		pages.count().then((result) => {
			expect(result.count).to.equal(4);
			done();
		});
	});

	it("should find the created page", (done) => {
		const pages = new PageTable();
		pages
			.findOne({
				name: "/test",
				title: "test",
			})
			.then((result) => {
				expect(result).not.to.be.null;
				expect(result.name).to.equal("/test");
				done();
			});
	});

	it("should not insert duplicate page", (done) => {
		const pages = new PageTable();
		pages
			.addPage({
				name: "/test",
				title: "test",
			})
			.then((addedRow) => {
				expect(addedRow).to.be.null;
			})
			.catch((err: Error) => {
				expect(err).not.to.be.null;
			})
			.finally(() => {
				done();
			});
	});

	it("should update page", (done) => {
		const pages = new PageTable();
		pages
			.updatePage(2, { name: "/test4", title: "test4" })
			.then((affectedRecords) => {
				expect(affectedRecords).to.equal(1);
				done();
			});
	});

	it("should find the updated page", (done) => {
		const pages = new PageTable();
		pages
			.findOne({
				name: "/test4",
				title: "test4",
			})
			.then((result) => {
				expect(result).not.to.be.null;
				expect(result.name).to.equal("/test4");
				done();
			})
			.catch((err: Error) => {
				console.error(err);
			});
	});

	it("should delete a page", (done) => {
		const pages = new PageTable();
		pages.deletePageById(2).then((affectedRecords) => {
			expect(affectedRecords).to.equal(1);
			done();
		});
	});

	it("should delete page", (done) => {
		const pages = new PageTable();
		pages
			.deletePage({
				name: "/test1",
				title: "test1",
			})
			.then((affectedRecords) =>
				pages.deletePage({ name: "/test2", title: "test2" })
			)
			.then(() => {
				done();
			});
	});

	it("should have only one row at the end", (done) => {
		const pages = new PageTable();
		pages.count().then((result) => {
			expect(result.count).to.equal(1);
			done();
		});
	});
});
