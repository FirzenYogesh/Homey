import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";
import config from "config";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(config.get("database.name"))
		.createTable("pages", (table) => {
			table.increments();
			table.foreign("id").references("pageId").inTable("sections");
			table.string("name").unique();
			table.string("title").notNullable();
			table.string("description");
			// table.boolean("isPublic").defaultTo(false);
			table.string("icon");
			table.timestamps(true, true, true);
		})
		.then(() => {
			return knex("pages").insert([{ name: "/", title: "" }]);
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(config.get("database.name"))
		.dropTable("pages");
}
