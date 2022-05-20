import * as sqlite3 from "sqlite3";
sqlite3.verbose();
import async from "async";
import config from "config";
import _ from "lodash";
import { generateHashAndSalt } from "../../utils/password";

const APP_NAME = config.get("app.name");
export const TABLE_NAME = "users";

export default class UsersTable {
	#database: sqlite3.Database;

	constructor(db: sqlite3.Database) {
		this.#database = db;
	}

	migrate(callback) {
		async.waterfall(
			[
				(wcb) => {
					this.#database.run(
						`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
							id INTEGER PRIMARY KEY AUTOINCREMENT,
							username TEXT UNIQUE,
							hash TEXT NOT NULL,
                            salt TEXT NOT NULL
						)`,
						(result: sqlite3.RunResult, err: Error) => {
							if (err) {
								wcb(err.message, null);
							} else if (result) {
								wcb(result, null);
							} else {
								wcb(null, true);
							}
						}
					);
				},
				(_result, wcb) => {
					this.#database.run(
						`INSERT OR IGNORE INTO ${TABLE_NAME}(username,hash,salt) VALUES(?,?,?)`,
						[
							config.get("admin.username"),
							..._.values(
								generateHashAndSalt(
									config.get("admin.username")
								)
							),
						],
						(result: sqlite3.RunResult, err: Error): void => {
							if (err) {
								wcb(err.message, null);
							} else if (result) {
								wcb(result, null);
							} else {
								wcb(null, true);
							}
						}
					);
				},
			],
			callback
		);
	}

	defaultRecordExists(callback) {
		this.#database.get(
			`SELECT * FROM ${TABLE_NAME} WHERE username=(?)`,
			[config.get("admin.username")],
			(err: Error, row: any) => {
				if (err) {
					callback(err, null);
				} else {
					callback(null, _.extend({ table: TABLE_NAME }, row));
				}
			}
		);
	}
}
