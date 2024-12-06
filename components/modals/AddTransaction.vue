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
					v-model="state.category"
					:options="
						categories.map((category) => ({
							label: category.name,
							value: category.id,
						}))
					"
				/>
			</UFormGroup>
			<UFormGroup label="Date" name="date">
				<UInput size="lg" id="date" v-model="state.date" type="date" />
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

	const categories = ref<CategoryType[]>([]);

	const state = reactive({
		title: '',
		amount: 0,
		category: 0,
		date: '',
	});

	fetching(`/categories/${props.type}`).then((res: any) => {
		console.log(res);
		categories.value = res;

		if (categories.value.length > 0) {
			state.category = categories.value[0].id;
		}
	});

	const handleSubmit = () => {
		console.log(state);
	};
</script>
