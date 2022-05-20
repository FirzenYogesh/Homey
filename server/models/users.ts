import async from "async";
import _ from "lodash";
import { database } from "../database";
import { generateAccessToken } from "../utils/access_token";
import { generateHashAndSalt, validatePassword } from "../utils/password";

export const TABLE_NAME = "users";

export interface User {
	id?: number;
	name: string;
	hash?: string;
	salt?: string;
	createdAt?: number | Date;
	updatedAt?: number | Date;
}

export class UserTable {
	#queryBuilder() {
		return database.table(TABLE_NAME);
	}

	findUserById(id: number) {
		return this.#queryBuilder().where("id", id).first();
	}

	findOne(user: User) {
		return this.#queryBuilder().where(user).first();
	}

	find(user: User) {
		return this.#queryBuilder().where(user);
	}

	exists(name: string): Promise<boolean> {
		return this.findOne({ name: name })
			.then((row) => {
				return row !== null;
			})
			.catch((_err: Error) => false);
	}

	signUp(name: string, password: string) {
		return this.#addUser(
			_.extend({ name: name }, generateHashAndSalt(password))
		);
	}

	#addUser(user: User) {
		return database.insert(user).into(TABLE_NAME);
	}

	validatePassword(name: string, password: string): Promise<boolean> {
		return this.findOne({ name: name })
			.then((row) => {
				if (row) {
					validatePassword(password, {
						hash: row.hash,
						salt: row.salt,
					});
				}
				return false;
			})
			.catch((_err: Error) => false);
	}

	signIn(name: string, password: string) {
		return async.waterfall(
			[
				async () => this.exists(name),
				async (userExists: boolean) => {
					if (userExists) {
						return this.validatePassword(name, password);
					} else {
						throw new Error("Username or password is wrong");
					}
				},
				async (passwordValid) => {
					if (passwordValid) {
						return generateAccessToken(name);
					} else {
						throw new Error("Username or password is wrong");
					}
				},
			],
			(err: Error) => {
				if (err) {
					throw err;
				}
			}
		);
	}

	changeUserName(name: string, password: string, newUserName: string) {
		return async.waterfall(
			[
				async () => this.exists(name),
				async (userExists: boolean) => {
					if (userExists) {
						return this.validatePassword(name, password);
					} else {
						throw new Error("User does not exist");
					}
				},
				async (passwordValid) => {
					if (passwordValid) {
						return this.#updateUser(name, { name: name });
					} else {
						throw new Error("Wrong Password");
					}
				},
			],
			(err: Error) => {
				if (err) {
					throw err;
				}
			}
		);
	}

	changePassword(
		name: string,
		existingPassword: string,
		newPassword: string
	) {
		return async.waterfall(
			[
				async () => this.exists(name),
				async (userExists: boolean) => {
					if (userExists) {
						return this.validatePassword(name, existingPassword);
					} else {
						throw new Error("User does not exist");
					}
				},
				async (passwordValid) => {
					if (passwordValid) {
						return this.#updateUser(
							name,
							_.extend(
								{ name: name },
								generateHashAndSalt(newPassword)
							)
						);
					} else {
						throw new Error("Wrong Password");
					}
				},
			],
			(err: Error) => {
				if (err) {
					throw err;
				}
			}
		);
	}

	#updateUser(name: string, data: User) {
		return this.#queryBuilder().where("name", name).update(data);
	}

	deleteUserById(id: number) {
		return this.#queryBuilder().where({ id: id }).delete();
	}

	deleteUser(user: User) {
		return this.#queryBuilder().where(user).delete();
	}

	totalCount() {
		return this.#queryBuilder().count({ count: "*" }).first();
	}
}
