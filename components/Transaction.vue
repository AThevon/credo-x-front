<template>
	<div
		:class="`transaction-${transaction.id}`"
		class="transaction relative overflow-hidden flex justify-between shadow-sm bg-neutral-100 dark:bg-neutral-800 dark:text-white rounded-xl px-8 py-6"
		@click="toggle"
		@mouseenter="hoverIn"
		@mouseleave="hoverOut"
	>
		<div class="max-w-[250px] block">
			<p class="text-xl block">{{ transaction.title }}</p>
			<p class="text-neutral-600 italic">Le {{ formattedDate }}</p>
		</div>
		<p class="flex text-xl ml-auto self-center">
			{{ transaction.amount }}
			<span class="block text-sm ml-1 text-primary-600 dark:text-primary-400"
				>€</span
			>
		</p>
		<!-- Options affichées seulement si la transaction est "ouverte" -->
		<div>
			<div
				v-show="isExpanded"
				ref="expandableContent"
				class="w-0 h-full pl-2 flex items-center gap-1"
			>
				<button
					class="h-fit !text-black dark:!text-white hover:!text-white hover:!bg-primary-500 p-3 rounded-lg"
					@click.stop="openEditModal"
               title="Modifier"
				>
					<Pencil :size="18" />
				</button>
				<button
					class="h-fit !text-black dark:!text-white hover:!text-white hover:!bg-red-500 p-3 rounded-lg"
					@click.stop="openDeleteModal"
               title="Supprimer"
				>
					<Trash :size="18" />
				</button>
			</div>
		</div>
		<div
			class="h-full left-0 top-0 w-1 absolute"
			:class="{
				'bg-green-500': transaction.category.type === 'income',
				'bg-red-500': transaction.category.type === 'expense',
			}"
		></div>

		<UModal v-model="isDeleteModalOpen">
			<UCard>
				<template #header>
					<h4 class="text-lg !text-red-500 font-bold">Attention</h4>
				</template>
				<p class="text-lg">
					Voulez-vous vraiment supprimer la transaction
					<span class="font-bold">{{ transaction.title }}</span> ?
				</p>
				<div class="flex justify-end gap-3">
					<UButton
						size="lg"
						label="Annuler"
						@click="isDeleteModalOpen = false"
					/>
					<UButton
						size="lg"
						color="red"
						label="Supprimer"
						@click="deleteTransaction"
					/>
				</div>
			</UCard>
		</UModal>
	</div>
</template>

<script lang="ts" setup>
	import { Pencil, Trash } from 'lucide-vue-next';
	import { ref, watch, onMounted } from 'vue';
	import type { TransactionType } from '~/types';
	import gsap from 'gsap';

	const props = defineProps({
		transaction: {
			required: true,
			type: Object as PropType<TransactionType>,
		},
		isExpanded: {
			type: Boolean,
			default: false,
		},
	});

	const transactionStore = useTransactionStore();

	const emit = defineEmits(['toggle', 'openEditModal']);

	const isDeleteModalOpen = ref(false);

	const expandableContent = ref<HTMLElement | null>(null);

	const dayjs = useDayjs();

	const formattedDate = computed(() =>
		dayjs(props.transaction.transaction_date).format('DD'),
	);

	const toggle = () => {
		emit('toggle', props.transaction.id);
	};

	const openEditModal = () => {
		emit('openEditModal', props.transaction);
	};

	const openDeleteModal = () => {
		isDeleteModalOpen.value = true;
	};

	const deleteTransaction = async () => {
		await transactionStore.deleteTransaction(props.transaction.id);
		isDeleteModalOpen.value = false; // Fermer la modale après suppression
		emit('toggle', null); // Réinitialiser l'état d'expansion si nécessaire
	};

	// Animation au survol
	const hoverIn = (event: MouseEvent) => {
		const element = event.currentTarget as HTMLElement;
		gsap.to(element, {
			scale: 1.04,
			duration: 0.3,
		});
	};

	const hoverOut = (event: MouseEvent) => {
		const element = event.currentTarget as HTMLElement;
		gsap.to(element, {
			scale: 1,
			duration: 0.3,
		});
	};

	// Animation de la partie isExpanded
	watch(
		() => props.isExpanded,
		(isExpanded) => {
			const element = expandableContent.value;
			if (element) {
				if (isExpanded) {
					gsap.fromTo(
						element,
						{ width: 0 },
						{
							width: 'auto',
							duration: 0.5,
							ease: 'power2.out',
						},
					);
				} else {
					gsap.to(element, {
						width: 0,
						duration: 0.3,
						ease: 'power2.in',
					});
				}
			}
		},
		{ immediate: true },
	);
</script>
