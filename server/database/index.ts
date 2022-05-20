import knex, { Knex } from "knex";
import config from "config";
import _ from "lodash";

export let database: Knex<any, unknown[]> = knex({
	client: getClient(),
	connection: connectionBuilder(),
});

function getClient(): string {
	const driver = config.get("database.driver").toString().toLowerCase();
	if (driver === "sqlite") {
		return "sqlite";
	} else if (driver === "postgresql") {
		return "pg";
	}
	return driver;
}

function connectionBuilder():
	| string
	| Knex.StaticConnectionConfig
	| Knex.ConnectionConfigProvider {
	const driver = config.get("database.driver").toString().toLowerCase();
	if (["mysql", "postgresql"].includes(driver)) {
		const url: string = config.get("database.url");
		if (_.isEmpty(url)) {
			return {
				host: config.get("host"),
				port: config.get("port"),
				user: config.get("user"),
				password: config.get("password"),
				database: config.get("database"),
			};
		} else {
			return url;
		}
	}
	return {
		filename: config.get("database.path"),
	};
}
