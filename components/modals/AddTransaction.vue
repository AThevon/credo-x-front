<template>
	<UCard
		:ui="{
			ring: '',
			divide: 'divide-y divide-gray-100 dark:divide-gray-800',
		}"
	>
		<template #header>
			<h2 class="title text-3xl">Ajouter une {{ typeLabel }}</h2>
		</template>
		<UForm :state="state" @submit="handleSubmit" class="flex flex-col gap-4">
			<UFormGroup label="Montant" name="amount">
				<UInput
					size="lg"
					id="amount"
					v-model="state.amount"
					type="number"
					required
					min="1"
				/>
			</UFormGroup>
			<UFormGroup label="Titre" name="title">
				<UInput
					size="lg"
					id="title"
					v-model="state.title"
					type="text"
					required
				/>
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
			<UFormGroup label="Date" name="date">
				<UInput
					size="lg"
					id="date"
					v-model="state.transaction_date"
					type="date"
					required
				/>
			</UFormGroup>

			<UButton size="lg" padded block label="Ajouter" type="submit" />
		</UForm>
	</UCard>
</template>

<script lang="ts" setup>
	import { ref, reactive, onMounted } from 'vue';
	import { useTransactionStore } from '@/stores/TransactionsStore';
	import type { CategoryType, TransactionType } from '~/types';

	const props = defineProps({
		type: String,
		typeLabel: String,
	});

	const emit = defineEmits(['addedTransaction']);

	const toast = useToast();
	const transactionStore = useTransactionStore();

	const categories = ref<CategoryType[]>([]);
	const state = reactive<Partial<TransactionType>>({
		amount: 0,
		title: '',
		category_id: 0,
		transaction_date: '',
	});

	// Charger les catégories
	onMounted(async () => {
		const res: any = await fetching(`/categories/${props.type}`);
		categories.value = res;

		if (categories.value.length > 0) {
			state.category_id = categories.value[0].id;
		}
	});

	// Soumettre le formulaire
	const handleSubmit = async () => {
		try {
			await transactionStore.addTransaction(state); // Appelle la méthode du store
			toast.add({
				title: 'Transaction ajoutée',
				description: 'La transaction a été ajoutée avec succès.',
				icon: 'i-octicon-desktop-download-24',
				color: 'green',
			});

			// Réinitialiser l'état
			Object.assign(state, {
				title: '',
				amount: 0,
				category_id: categories.value.length > 0 ? categories.value[0].id : 0,
				transaction_date: '',
			});

			emit('addedTransaction');
		} catch (error) {
			toast.add({
				title: 'Erreur lors de l’ajout',
				description: 'Une erreur est survenue, veuillez réessayer.',
				icon: 'i-octicon-alert-24',
				color: 'red',
			});
			console.error(error);
		}
	};
</script>
