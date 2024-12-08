<template>
	<div>
		<div class="flex justify-between items-end">
			<h3
				class="text-3xl !text-neutral-600 dark:!text-neutral-500 uppercase ml-10"
			>
				{{ typeLabel }}s
			</h3>
			<UButton
				:label="`Ajouter une ${typeLabel}`"
				size="lg"
				@click="isAddModalOpen = true"
            title="Ajouter une transaction"
			/>
			<UModal v-model="isAddModalOpen">
				<AddTransaction
					:type="type"
					:typeLabel="typeLabel"
					@addedTransaction="addedTransaction"
				/>
			</UModal>
		</div>
		<div
			class="flex flex-col gap-2 mt-2 overflow-auto h-[65vh] rounded-lg scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
		>
			<Transaction
				v-for="transaction in filteredTransactions"
				:key="transaction.id"
				:transaction="transaction"
				:isExpanded="expandedTransaction === transaction.id"
				@toggle="toggleTransaction"
				@openEditModal="openEditModal"
			/>
		</div>
		<UModal v-model="isEditModalOpen" v-if="transactionToEdit">
			<EditTransaction
				:transaction="transactionToEdit"
				@openEditModal="openEditModal"
				@updatedTransaction="updatedTransaction"
			/>
		</UModal>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import { useTransactionStore } from '@/stores/TransactionsStore';
	import type { TransactionType } from '~/types';
	import AddTransaction from './modals/AddTransaction.vue';
	import EditTransaction from './modals/EditTransaction.vue';
   import gsap from 'gsap';

	const props = defineProps({
		type: String,
	});

	const typeLabel = computed(() =>
		props.type === 'income' ? 'entrée' : 'sortie',
	);

	const isAddModalOpen = ref(false); // État pour la modale d'ajout
	const isEditModalOpen = ref(false); // État pour la modale d'édition
	const transactionToEdit = ref<TransactionType | null>(null); // Transaction sélectionnée pour l'édition

	const transactionStore = useTransactionStore();

	// Transactions filtrées selon le type
	const filteredTransactions = computed(() =>
		transactionStore.transactions
			.filter((transaction) => transaction.category.type === props.type)
			.sort(
				(a, b) =>
					new Date(a.transaction_date).getTime() -
					new Date(b.transaction_date).getTime(),
			),
	);

	const expandedTransaction = ref<number | null>(null);

	const toggleTransaction = (transactionId: number) => {
		expandedTransaction.value =
			expandedTransaction.value === transactionId ? null : transactionId;
	};

	const openEditModal = (transaction: TransactionType) => {
		transactionToEdit.value = transaction;
		isEditModalOpen.value = true;
	};

	const updatedTransaction = () => {
		isEditModalOpen.value = false;
		transactionToEdit.value = null;
	};

	const addedTransaction = () => {
		isAddModalOpen.value = false;
	};

	const animateTransactions = async () => {
		await nextTick(); // Assure que les éléments DOM sont rendus
		gsap.fromTo(
			'.transaction', // Utilise une classe commune pour toutes les transactions
			{ opacity: 0, y: 50 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.1, // Ajoute un décalage progressif
				ease: 'power2.out',
			},
		);
	};

	onMounted(() => {
		animateTransactions();
	});
</script>
