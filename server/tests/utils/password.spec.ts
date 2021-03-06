import {
	PasswordHash,
	generateHashAndSalt,
	validatePassword,
} from "../../utils/password";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("Password Utility Test", () => {
	const testPassword = "hello123";
	let passwordHash: PasswordHash;
	it("password should be hashed", () => {
		passwordHash = generateHashAndSalt(testPassword);
		expect(passwordHash).not.to.be.null;
		expect(passwordHash.hash).not.to.be.null;
		expect(passwordHash.hash).to.be.string;
		expect(passwordHash.salt).not.to.be.null;
		expect(passwordHash.salt).to.be.string;
	});

	it("password should be valid", () => {
		expect(validatePassword(testPassword, passwordHash)).to.be.true;
	});
});
