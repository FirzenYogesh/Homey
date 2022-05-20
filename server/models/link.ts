import knex, { Knex } from "knex";

export default interface Link {
	id: number | string;
	title: string;
	description: string;
	userId: number | string;
	sectionId: number | string;
	isPublic: boolean;
	icon: string;
	url: {
		main: string;
		android: string;
		ios: string;
	};
    openTarget: string
	healthCheck: {
		url: number | string;
		enabled: boolean;
		status: number;
	};
}

