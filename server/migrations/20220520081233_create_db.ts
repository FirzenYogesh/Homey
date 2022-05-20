import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";

import config from "config";

export async function up(knex: Knex): Promise<void> {
	if (config.get("database.driver") === "postgres") {
		knex.schema.createSchemaIfNotExists(config.get("database.name"));
	}
}

export async function down(knex: Knex): Promise<void> {
	if (config.get("database.driver") === "postgres") {
		knex.schema.dropSchemaIfExists(config.get("database.name"));
	}
}
