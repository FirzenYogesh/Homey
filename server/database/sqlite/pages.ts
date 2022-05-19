import * as sqlite3 from "sqlite3";
sqlite3.verbose();
import async from "async";
import config from "config";
import _ from "lodash";

const APP_NAME = config.get("appName");
export const TABLE_NAME = "pages";

export default class PagesTable {
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
							name TEXT UNIQUE,
							title TEXT NOT NULL,
							description TEXT,
							icon TEXT,
							createdAt TEXT,
							updatedAt TEXT,
							createdBy userId,
							updateLastBy userId
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
						`INSERT OR IGNORE INTO ${TABLE_NAME}(name,description) VALUES(?,?)`,
						[
							"/",
							`Welcome to ${APP_NAME}, your brand new dashboard`,
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
			`SELECT * FROM ${TABLE_NAME} WHERE name=(?)`,
			["/"],
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
