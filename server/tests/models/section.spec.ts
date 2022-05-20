import dotEnv from "dotEnv";
dotEnv.config();

import { expect } from "chai";
import "mocha";

import { SectionTable } from "../../models/section";

describe("sections table test", () => {
	it("default section exists", (done) => {
		const sections = new SectionTable();
		sections
			.findSectionById(1)
			.then((result) => {
				expect(result).not.to.be.null;
				expect(result.name).to.equal("/");
				done();
			})
			.catch((err: Error) => {
				console.error(err);
			});
	});

	it("should create a sections", (done) => {
		const sections = new SectionTable();
		sections
			.addSections([
				{
					name: "/test",
					title: "test",
					pageId: 1,
				},
				{
					name: "/test1",
					title: "test1",
					pageId: 1,
				},
				{
					name: "/test2",
					title: "test2",
					pageId: 2,
				},
			])
			.then((addedRows) => {
				expect(addedRows).not.to.be.null;
			})
			.catch((err: Error) => {
				console.error(err);
				expect(err).to.be.null;
			})
			.finally(() => {
				done();
			});
	});

	it("should have 4 rows after insertion", (done) => {
		const sections = new SectionTable();
		sections
			.count()
			.then((result) => {
				expect(result.count).to.equal(4);
				done();
			})
			.catch((err: Error) => {
				console.error(err);
			});
	});

	it("should find the created section", (done) => {
		const sections = new SectionTable();
		sections
			.findOne({
				name: "/test2",
				title: "test2",
				pageId: 2,
			})
			.then((result) => {
				expect(result).not.to.be.null;
				expect(result.name).to.equal("/test2");
				done();
			})
			.catch((err: Error) => {
				console.error(err);
			});
	});

	it("should not insert duplicate section", (done) => {
		const sections = new SectionTable();
		sections
			.addSection({
				name: "/test2",
				title: "test2",
				pageId: 2,
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

	it("should update section", (done) => {
		const sections = new SectionTable();
		sections
			.updateSection(2, { name: "/test4", title: "test4", pageId: 5 })
			.then((affectedRecords) => {
				expect(affectedRecords).to.equal(1);
				done();
			})
			.catch((err: Error) => {
				console.error(err);
			});
	});

	it("should find the updated section", (done) => {
		const sections = new SectionTable();
		sections
			.findOne({
				name: "/test4",
				title: "test4",
				pageId: 5,
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

	it("should delete a section", (done) => {
		const sections = new SectionTable();
		sections
			.deleteSectionById(2)
			.then((affectedRecords) => {
				expect(affectedRecords).to.equal(1);
				done();
			})
			.catch((err: Error) => {
				console.error(err);
			});
	});

	it("should delete section", (done) => {
		const sections = new SectionTable();
		sections
			.deleteSection({
				name: "/test1",
				title: "test1",
				pageId: 1,
			})
			.then((affectedRecords) =>
				sections.deleteSection({
					name: "/test2",
					title: "test2",
					pageId: 2,
				})
			)
			.then(() => {
				done();
			})
			.catch((err: Error) => {
				console.error(err);
			});
	});

	it("should have only one row at the end", (done) => {
		const sections = new SectionTable();
		sections
			.count()
			.then((result) => {
				expect(result.count).to.equal(1);
				done();
			})
			.catch((err: Error) => {
				console.error(err);
			});
	});
});
