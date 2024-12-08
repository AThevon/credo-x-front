<template>
	<UCard
		:ui="{
			ring: '',
			divide: 'divide-y divide-gray-100 dark:divide-gray-800',
		}"
	>
		<template #header>
			<h2 class="title text-3xl">Modifier la transaction</h2>
		</template>
		<UForm :state="state" @submit="handleSubmit" class="flex flex-col gap-4">
			<UFormGroup label="Montant" name="amount">
				<UInput size="lg" id="amount" v-model="state.amount" type="number" />
			</UFormGroup>
			<UFormGroup label="Titre" name="title">
				<UInput size="lg" id="title" v-model="state.title" type="text" />
			</UFormGroup>
			<UFormGroup label="Catégorie" name="category">
				<USelect
					size="lg"
					id="category"
					v-model="state.category_id"
					:options="
						categories.map((category) => ({
							label: category.name,
							value: category.id,
						}))
					"
				/>
			</UFormGroup>
			<UFormGroup label="Date" name="transaction_date">
				<UInput
					size="lg"
					id="transaction_date"
					v-model="state.transaction_date"
					type="date"
				/>
			</UFormGroup>

			<UButton size="lg" padded block label="Enregistrer" type="submit" />
		</UForm>
	</UCard>
</template>

<script lang="ts" setup>
	import { reactive, watch } from 'vue';
	import { useTransactionStore } from '@/stores/TransactionsStore';
	import type { TransactionType, CategoryType } from '~/types';

	const props = defineProps({
		transaction: {
			type: Object as PropType<TransactionType>,
			required: true,
		},
	});

	const toast = useToast();
	const transactionStore = useTransactionStore();

	const state = reactive({
		title: props.transaction.title,
		amount: props.transaction.amount,
		category_id: props.transaction.category.id,
		transaction_date: props.transaction.transaction_date,
	});

	const categories = ref<CategoryType[]>([]);
	fetching(`/categories/${props.transaction.category.type}`).then(
		(res: any) => {
			categories.value = res;
		},
	);

	// Mettre à jour l'état si la transaction change
	watch(
		() => props.transaction,
		(newTransaction) => {
			state.title = newTransaction.title;
			state.amount = newTransaction.amount;
			state.category_id = newTransaction.category.id;
			state.transaction_date = newTransaction.transaction_date;
		},
		{ immediate: true },
	);

	const emit = defineEmits(['updatedTransaction']);

	const handleSubmit = async () => {
		try {
			await transactionStore.editTransaction(props.transaction.id, state); // Appel au store
			toast.add({
				title: 'Transaction mise à jour',
				description: 'La transaction a été modifiée avec succès.',
				icon: 'i-octicon-check-24',
				color: 'green',
			});
         emit('updatedTransaction');
		} catch (error) {
			toast.add({
				title: 'Erreur',
				description: 'Impossible de modifier la transaction.',
				icon: 'i-octicon-alert-24',
				color: 'red',
			});
			console.error(error);
		}
	};
</script>
