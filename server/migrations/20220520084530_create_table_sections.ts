import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";

import config from "config";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(config.get("database.name"))
		.createTable("sections", (table) => {
			table.increments();
			table.string("name").notNullable().unique();
			table.string("title").notNullable();
			table.string("description");
			table.integer("pageId").notNullable();
			table.string("icon");
			table.timestamps(true, true, true);
		})
		.then(() => {
			return knex("sections").insert([
				{ name: "/default", title: "", pageId: 1 },
			]);
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(config.get("database.name"))
		.dropTable("sections");
}
