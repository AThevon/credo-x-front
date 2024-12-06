<template>
	<div class="">
		<div class="flex justify-between items-end">
			<h3
				class="text-3xl !text-neutral-600 dark:!text-neutral-500 uppercase ml-10"
			>
				{{ typeLabel }}s
			</h3>
			<UButton
				:label="`Ajouter une ${typeLabel}`"
				size="lg"
				@click="isOpen = true"
			/>
			<UModal v-model="isOpen">
				<AddTransaction :type :typeLabel />
			</UModal>
		</div>
		<div
			class="flex flex-col gap-2 mt-2 overflow-auto h-[65vh] rounded-lg scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
		>
			<Transaction v-for="transaction in test" :key="transaction" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import AddTransaction from './modals/AddTransaction.vue';

	const test = ['coy', 'coy', 'coy'];

	const props = defineProps({
		type: String,
	});

	const typeLabel = computed(() =>
		props.type === 'income' ? 'entrée' : 'sortie',
	);

	const isOpen = ref(false);
</script>
