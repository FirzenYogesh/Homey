import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";
import config from "config";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(config.get("database.name"))
		.createTable("links", (table) => {
			table.increments();
			table.string("title").notNullable();
			table.string("description");
			table.integer("userId").notNullable();
			table.integer("sectionId").notNullable();
			table.boolean("isPublic").defaultTo(false);
			table.string("icon");
			table.json("url");
			table.string("openTarget");
			table.json("healthCheck");
			table.timestamps(true, true, true);
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(config.get("database.name"))
		.dropTable("links");
}
