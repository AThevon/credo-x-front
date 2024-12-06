<template>
	<div class="ml-8 flex flex-col w-full">
		<h2 class="title text-6xl my-4 text-gray-700">Total</h2>
		<div class="flex justify-between gap-4 items-center my-4">
			<div>
				<p class="text-xl text-green-500 font-bold">Total Entrées</p>
				<p class="text-2xl font-semibold">{{ formatCurrency(totalEntries) }}</p>
			</div>
			<div>
				<p class="text-xl text-red-500 font-bold">Total Sorties</p>
				<p class="text-2xl font-semibold">{{ formatCurrency(totalExits) }}</p>
			</div>
		</div>
    <UDivider />
		<div class="pt-4">
			<p class="text-xl font-bold">Différence</p>
			<p
				class="text-3xl font-semibold"
				:class="difference >= 0 ? 'text-green-500' : 'text-red-500'"
			>
				{{ formatCurrency(difference) }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const difference = ref(50);
	const totalEntries = ref(1000);
	const totalExits = ref(950);

	// Fonction utilitaire pour formater en devise
	const formatCurrency = (value: number): string => {
		return value.toLocaleString('fr-FR', {
			style: 'currency',
			currency: 'EUR',
		});
	};
</script>
