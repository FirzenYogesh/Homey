import _ from "lodash";

export default class QueryBuilder {
	_query: string;

	constructor() {
		this._query = "";
	}

	select(...columns: string[]): QueryBuilder {
		const select = `SELECT ${_.join(columns, ",")} `;
		if (!this._query.includes(select)) {
			this._query += select;
		}
		return this;
	}

	from(table: string): QueryBuilder {
		const from = `FROM ${table} `;
		if (!this._query.includes(from)) {
			this._query += from;
		}
		return this;
	}

	where(...columns: string[]): QueryBuilder {
		const where = `WHERE ${_.join(columns, "=(?),")}=(?), `;
		if (!this._query.includes(where)) {
			this._query += where;
		}
		return this;
	}

	limit(count: number): QueryBuilder {
		this._query = `LIMIT ${count}`;

		return this;
	}

	// orderBy(): QueryBuilder {}
}
