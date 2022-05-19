import * as sqlite3 from "sqlite3";
sqlite3.verbose();
import async from "async";
import Link from "../../models/link";

export default class LinksTable {
	database: sqlite3.Database;
	constructor(db: sqlite3.Database) {
		this.database = db;
	}

	migrate(callback) {
		this.database.run(
			`CREATE TABLE IF NOT EXISTS links (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
				description TEXT,
                userId INTEGER NOT NULL,
				sectionId INTEGER NOT NULL,
				isPublic INTEGER,
                icon TEXT,
                url TEXT,
                androidUrl TEXT,
                iosUrl TEXT,
                openTarget TEXT DEFAULT 'new tab',
				healthCheckEnabled INTEGER,
				healthCheckUrl TEXT,
				healthCheckStatus INTEGER DEFAULT 200,
            )`,
			(result: sqlite3.RunResult, err: Error) => {
				if (err) {
					callback(err.message, null);
				} else if (result) {
					callback(result, null);
				} else {
					callback(null, true);
				}
			}
		);
	}

	addLink(linkObject: Link) {
		
	}
}
