import { helloTest } from "../sample";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("First test", () => {
	it("should return Hello World!", () => {
		const result = helloTest();
		expect(result).to.equal("Hello World!");
	});
});
