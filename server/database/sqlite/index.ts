import * as sqlite3 from "sqlite3";
sqlite3.verbose();
import async from "async";

/**
 * The path of the database
 */
const DATABASE_PATH = process.env.DATABASE_PATH || "/opt/homey/data/homey.db";
console.log(DATABASE_PATH);

let database: sqlite3.Database;

export function connect(callback: any) {
	database = new sqlite3.Database(DATABASE_PATH);
	return migrate(callback);
}

/**
 * Prepare the database before executing anything
 */
function migrate(callback) {
	async.waterfall(
		[
			(wcb: (arg0: string | sqlite3.RunResult, arg1: boolean) => any) => {
				database.run(
					`CREATE TABLE IF NOT EXISTS sections (
						id INTEGER PRIMARY KEY AUTOINCREMENT,
						title TEXT NON NULL,
						icon TEXT,
						minumumColumns INTEGER DEFAULT 1,
						minumumRows INTEGER DEFAULT 1
					)
            `,
					(result: sqlite3.RunResult, err: Error) => {
						if (err) {
							return wcb(err.message, null);
						} else if (result) {
							return wcb(result, null);
						} else {
							console.info("Table sections migrated");
							return wcb(null, true);
						}
					}
				);
			},
			(
				_arg1: any,
				wcb: (arg0: string | sqlite3.RunResult, arg1: boolean) => any
			) => {
				database.run(
					`CREATE TABLE IF NOT EXISTS links (
						id INTEGER PRIMARY KEY AUTOINCREMENT,
						title TEXT NON NULL,
						icon TEXT,
						url TEXT,
						androidUrl TEXT,
						iosUrl TEXT,
						openMethod INTEGER
					)
            `,
					(result: sqlite3.RunResult, err: Error) => {
						if (err) {
							return wcb(err.message, null);
						} else if (result) {
							return wcb(result, null);
						} else {
							console.info("Table links migrated");
							return wcb(null, true);
						}
					}
				);
			},
		],
		callback
	);
}

export function close() {
	return database.close();
}
