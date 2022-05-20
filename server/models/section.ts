import { database } from "../database";
export const TABLE_NAME = "sections";
export interface Section {
	id?: number;
	name: string;
	title: string;
	description?: string;
	pageId: number;
	icon?: string;
	createdAt?: number | Date;
	updatedAt?: number | Date;
}

export class SectionTable {
	#queryBuilder() {
		return database.table(TABLE_NAME);
	}

	findSectionById(id: number) {
		return this.#queryBuilder().where("id", id).first();
	}

	findOne(section: Section) {
		return this.#queryBuilder().where(section).first();
	}

	find(section: Section) {
		return this.#queryBuilder().where(section);
	}

	addSection(section: Section) {
		return this.addSections([section]);
	}

	addSections(sections: Section[]) {
		return database.insert(sections).into(TABLE_NAME);
	}

	updateSection(id: number, data: Section) {
		return this.#queryBuilder().where("id", id).update(data);
	}

	deleteSectionById(id: number) {
		return this.#queryBuilder().where({ id: id }).delete();
	}

	deleteSection(section: Section) {
		return this.#queryBuilder().where(section).delete();
	}

	count() {
		return this.#queryBuilder().count({ count: "*" }).first();
	}
}
