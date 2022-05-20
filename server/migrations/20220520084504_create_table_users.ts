import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";
import _ from "lodash";
import config from "config";
import { generateHashAndSalt, PasswordHash } from "../utils/password";

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(config.get("database.name"))
		.createTable("users", (table) => {
			table.increments();
			table.foreign("id").references("userId").inTable("links");
			table.string("name").notNullable().unique();
			table.string("hash").notNullable();
			table.string("salt").notNullable();
			table.timestamps(true, true, true);
		})
		.then(() => {
			const passwordHash: PasswordHash = generateHashAndSalt(
				config.get("admin.password")
			);
			return knex("users").insert([
				_.extend({ name: config.get("admin.username") }, passwordHash),
			]);
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.withSchema(config.get("database.name"))
		.dropTable("users");
}
