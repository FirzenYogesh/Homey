import { database } from "../database";

export const TABLE_NAME = "pages";

export interface Page {
	id?: number;
	name: string;
	title: string;
	description?: string;
	icon?: string;
	createdAt?: number | Date;
	updatedAt?: number | Date;
}

export class PageTable {
	#queryBuilder() {
		return database.table(TABLE_NAME);
	}

	findPageById(id: number) {
		return this.#queryBuilder().where("id", id).first();
	}

	findOne(page: Page) {
		return this.#queryBuilder().where(page).first();
	}

	find(page: Page) {
		return this.#queryBuilder().where(page);
	}

	addPage(page: Page) {
		return this.addPages([page]);
	}

	addPages(pages: Page[]) {
		return database.insert(pages).into(TABLE_NAME);
	}

	updatePage(id: number, data: Page) {
		return this.#queryBuilder().where("id", id).update(data);
	}

	deletePageById(id: number) {
		return this.#queryBuilder().where({ id: id }).delete();
	}

	deletePage(page: Page) {
		return this.#queryBuilder().where(page).delete();
	}

	count() {
		return this.#queryBuilder().count({ count: "*" }).first();
	}
}
