import * as sqlite3 from "sqlite3";
import config from "config";
sqlite3.verbose();
import async from "async";
import SectionsTable from "./sections";
import LinksTable from "./links";
import PagesTable from "./pages";
import UsersTable from "./users";

/**
 * The path of the database
 */
const DATABASE_PATH: string = config.get("database.path");
export default class DatabaseDriver {
	#database: sqlite3.Database;

	#pagesTable: PagesTable;
	#sectionsTable: SectionsTable;
	#linksTable: LinksTable;
	#usersTable: UsersTable;

	isConnected = () => this.#database != null;
	/**
	 * Connect to the database
	 * @param callback callback to see if the database connection was successful, sends error and boolean respectively
	 */
	connect(callback) {
		this.#database = new sqlite3.Database(DATABASE_PATH, (err: Error) => {
			if (err) {
				return callback(err);
			} else {
				this.#pagesTable = new PagesTable(this.#database);
				this.#sectionsTable = new SectionsTable(this.#database);
				this.#linksTable = new LinksTable(this.#database);
				this.#usersTable = new UsersTable(this.#database);
				return callback(null, true);
			}
		});
	}

	/**
	 * Prepare the database before executing anything
	 * @param callback callback to see if the database migration was successful, sends error and boolean respectively
	 */
	migrate(callback) {
		async.waterfall(
			[
				(wcb) => this.#pagesTable.migrate(wcb),
				(_result, wcb) => this.#sectionsTable.migrate(wcb),
				(_result, wcb) => this.#linksTable.migrate(wcb),
				(_result, wcb) => this.#usersTable.migrate(wcb),
			],
			callback
		);
	}

	defaultRecordsExist(callback) {
		async.parallel(
			[
				(pcb) => this.#pagesTable.defaultRecordExists(pcb),
				(pcb) => this.#sectionsTable.defaultRecordExists(pcb),
			],
			callback
		);
	}

	/**
	 * Close the database
	 * @param callback callback to see if the database close was successful, sends error and boolean respectively
	 */
	close(callback) {
		this.#database.close((err: Error) => {
			callback(err, err == null);
		});
	}

	pages(): PagesTable {
		return this.#pagesTable;
	}

	sections(): SectionsTable {
		return this.#sectionsTable;
	}
}
