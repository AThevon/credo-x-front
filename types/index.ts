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
	title: string;
	category: CategoryType;
	category_id: string;
	transaction_date: string;
};

export type TotalType = {
	income: number;
	expense: number;
	balance: number;
};
