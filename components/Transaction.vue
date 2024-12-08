<template>
	<div
		class="relative overflow-hidden grid grid-cols-2 shadow-sm bg-neutral-100 dark:bg-neutral-800 dark:text-white rounded-xl px-8 py-6"
	>
		<p class="text-2xl self-end">{{ transaction.title }}</p>
		<p class="flex text-xl self-center justify-self-end row-span-2">
			{{ transaction.amount }}
			<span class="block text-sm ml-1 text-primary-600 dark:text-primary-400"
				>€</span
			>
		</p>
		<p class="text-neutral-600 italic">Le {{ formattedDate }}</p>
		<div
			class="h-full w-1 absolute"
			:class="{
				'bg-green-500': transaction.category.type === 'income',
				'bg-red-500': transaction.category.type === 'expense',
			}"
		></div>
	</div>
</template>

<script lang="ts" setup>
	import type { TransactionType } from '~/types';
	const props = defineProps({
		transaction: {
			required: true,
			type: Object as PropType<TransactionType>,
		},
	});

	const dayjs = useDayjs();
	const formattedDate = computed(() =>
		dayjs(props.transaction.transaction_date).format('DD'),
	);
</script>
