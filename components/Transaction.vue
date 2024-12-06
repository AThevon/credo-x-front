<template>
	<div
		class="grid grid-cols-2 shadow-sm bg-neutral-100 dark:bg-neutral-800 dark:text-white rounded-xl px-8 py-6"
	>
		<!-- <p class="text-xl">{{ transaction.title }}</p> -->
		<p class="text-3xl self-end">Github Copilot</p>
		<!-- <p class="text-xl">{{ transaction.amount }}</p> -->
		<p class="flex text-xl self-center justify-self-end row-span-2">
			50
			<span class="block text-sm ml-1 text-primary-600 dark:text-primary-400">€</span>
		</p>
		<p class="text-neutral-600 italic">2021-09-01</p>
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		transaction: Object,
	});
</script>
