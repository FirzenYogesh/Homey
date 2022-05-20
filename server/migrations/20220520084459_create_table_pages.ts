import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(process.env.DATABASE_NAME)
		.createTable("pages", (table) => {
			table.increments();
			table.foreign("id").references("pageId").inTable("sections");
			table.string("name").unique();
			table.string("title").notNullable();
			table.string("description");
			table.boolean("isPublic").defaultTo(false);
			table.string("icon");
			table.timestamps(true, true, true);
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.withSchema(process.env.DATABASE_NAME).dropTable("pages");
}
