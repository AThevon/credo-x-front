import Transaction from '~/components/Transaction.vue';

export type UserType = {
	user: {
		id: number;
		name: string;
		email: string;
	};
};

export type CategoryType = {
  id: number;
	name: string;
	type: string;
	is_default: boolean;
	created_at: Date;
	user_id: number | null;
};

export type TransactionType = {
	id: number;
	amount: number;
	description: string;
	category: string;
	date: string;
};
