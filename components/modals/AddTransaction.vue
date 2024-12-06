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
			<UFormGroup label="Titre" name="title">
				<UInput size="lg" id="title" v-model="state.title" type="title" />
			</UFormGroup>
			<UFormGroup label="Montant" name="amount">
				<UInput size="lg" id="amount" v-model="state.amount" type="number" />
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
				/>
			</UFormGroup>

			<UButton size="lg" padded block label="Ajouter" type="submit" />
		</UForm>
	</UCard>
</template>

<script lang="ts" setup>
	import type { CategoryType } from '~/types';

	const props = defineProps({
		type: String,
		typeLabel: String,
	});

	const toast = useToast();
	const categories = ref<CategoryType[]>([]);

	const state = reactive({
		title: '',
		amount: 0,
		category_id: 0,
		transaction_date: '',
	});

	fetching(`/categories/${props.type}`).then((res: any) => {
		categories.value = res;

		if (categories.value.length > 0) {
			state.category_id = categories.value[0].id;
		}
	});

	const emit = defineEmits(['transactionAdded']);

	const handleSubmit = async () => {
		try {
			const response: any = await fetching('/transactions', {
				method: 'POST',
				body: state,
			});
			toast.add({
				title: 'Transaction ajoutée',
				description: 'La transaction a été ajoutée avec succès.',
				icon: 'i-octicon-desktop-download-24',
				color: 'green',
			});

			emit('transactionAdded', response.transaction);

			// reset state
			Object.assign(state, {
				title: '',
				amount: 0,
				category_id: categories.value.length > 0 ? categories.value[0].id : 0,
				date: '',
			});
		} catch (error) {
			toast.add({
				title: 'Erreur lors de l’inscription',
				description: 'Veuillez vérifier vos informations et réessayer.',
				icon: 'i-octicon-alert-24',
				color: 'red',
			});
			console.error(error);
		}
	};
</script>
