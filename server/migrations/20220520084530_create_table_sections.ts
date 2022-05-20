import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(process.env.DATABASE_NAME)
		.createTable("sections", (table) => {
			table.increments();
			table.string("name").notNullable().unique();
			table.string("title").notNullable();
			table.string("description");
			table.integer("pageId");
			table.string("icon");
			table.timestamps(true, true, true);
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(process.env.DATABASE_NAME)
		.dropTable("sections");
}
