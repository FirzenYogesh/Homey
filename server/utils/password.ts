import crypto from "crypto";

export interface PasswordHash {
	hash: string;
	salt: string;
}

export function generateHashAndSalt(password: string): PasswordHash {
	// Creating a unique salt for a particular user
	const salt = crypto.randomBytes(16).toString("hex");

	// Hashing user's salt and password with 1000 iterations,

	const hash = crypto
		.pbkdf2Sync(password, salt, 1000, 64, `sha512`)
		.toString(`hex`);

	return {
		salt,
		hash,
	};
}

export function validatePassword(
	password: string,
	passwordHash: PasswordHash
): boolean {
	const validateHash = crypto
		.pbkdf2Sync(password, passwordHash.salt, 1000, 64, `sha512`)
		.toString(`hex`);
	return passwordHash.hash === validateHash;
}
