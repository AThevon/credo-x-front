import { defineStore } from 'pinia';
import type { TransactionType, TotalType } from '@/types';

export const useTransactionStore = defineStore('transaction', {
	state: () => ({
		transactions: [] as TransactionType[],
		totals: { income: 0, expense: 0, balance: 0 },
	}),
	actions: {
		async fetchAllData() {
			const [allTransactions, totalData]: [TransactionType[], TotalType] =
				await Promise.all([
					fetching('/transactions') as Promise<TransactionType[]>,
					fetching('/transactions-totals') as Promise<TotalType>,
				]);

			this.transactions = allTransactions;
			this.totals = totalData;
		},

		async addTransaction(newTransaction: Partial<TransactionType>) {
			await fetching('/transactions', {
				method: 'POST',
				body: newTransaction,
			});
			await this.fetchAllData(); // Rafraîchit les données
		},

		async editTransaction(
			transactionId: number,
			updatedTransaction: Partial<TransactionType>,
		) {
			await fetching(`/transactions/${transactionId}`, {
				method: 'PUT',
				body: updatedTransaction,
			});
			await this.fetchAllData(); // Rafraîchit les données
		},

		async deleteTransaction(transactionId: number) {
			await fetching(`/transactions/${transactionId}`, {
				method: 'DELETE',
			});
			await this.fetchAllData(); // Rafraîchit les données
		},
	},
});
