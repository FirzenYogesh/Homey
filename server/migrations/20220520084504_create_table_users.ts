import { table } from "console";
import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(process.env.DATABASE_NAME)
		.createTable("users", (table) => {
			table.increments();
			table.foreign("id").references("userId").inTable("links");
			table.string("name").notNullable().unique();
			table.string("hash").notNullable();
			table.string("salt").notNullable();
			table.timestamps(true, true, true);
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.withSchema(process.env.DATABASE_NAME).dropTable("users");
}
