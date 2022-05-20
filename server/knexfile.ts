import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./dev.sqlite3",
		},
		migrations: {
			extension: "ts",
			tableName: "knex_migrations",
			directory: "migrations",
			stub: "migrations/ts.stub",
		},
	},

	staging: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			extension: "ts",
			directory: "migrations",
			stub: "migrations/ts.stub",
		},
	},

	production: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			extension: "ts",
			directory: "migrations",
			stub: "migrations/ts.stub",
		},
	},
};

module.exports = config;

// createTable("links", (table) => {
// 	table.increments();
// 	table.string("title").notNullable();
// 	table.string("description");
// 	table.integer("userId").notNullable();
// 	table.integer("sectionId").notNullable();
// 	table.boolean("isPublic").defaultTo(false);
// 	table.string("icon");
// 	table.json("url");
// 	table.string("openTarget");
// 	table.json("healthCheck");
// 	table.timestamps(true, true, true);
// });
