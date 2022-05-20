import dotEnv from "dotEnv";
dotEnv.config();
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	if (process.env.DATABASE_DRIVER === "postgres") {
		knex.schema.createSchemaIfNotExists(process.env.DATABASE_NAME);
	}
}

export async function down(knex: Knex): Promise<void> {
	if (process.env.DATABASE_DRIVER === "postgres") {
		knex.schema.dropSchemaIfExists(process.env.DATABASE_NAME);
	}
}
