<template>
	<div class="h-screen flex flex-col">
		<!-- <BurgerMenu :links="links" /> -->
		<nav class="relative flex justify-between items-center my-4 px-6">
			<NuxtLink
				to="/"
				class="flex items-end gap-1 transition-all active:scale-95"
			>
				<h1 class="text-2xl mb-[2px] font-bold font-second">CredoX</h1>
			</NuxtLink>
			<div v-if="!isAuthenticated" class="flex space-x-2">
				<UButton to="/register" class="text-sm"> S'inscrire </UButton>
				<UButton to="/login" class="text-sm"> Se connecter </UButton>
			</div>
			<div v-else class="flex space-x-2">
				<h3 v-if="user" class="text-sm">Bonjour, {{ user.name }}</h3>
				<UButton to="/profile" class="text-sm"> Mon compte </UButton>
				<UButton @click="logout" class="text-sm"> Se déconnecter </UButton>
			</div>
		</nav>
		<main class="h-full">
			<slot />
		</main>
		<footer class="relative flex justify-center items-center h-10">
			<div class="absolute inset-x-0 text-sm text-center text-gray-500">
				<UButton to="/terms" variant="link" class="p-0 mx-2 !text-gray-500"
					>Conditions générales</UButton
				>
				|
				<UButton to="/privacy" variant="link" class="p-0 mx-2 !text-gray-500"
					>Politique de confidentialité</UButton
				>
				|
				<p class="inline p-0 mx-2 text-gray-500">
					&copy; 2021 CredoX. All rights reserved.
				</p>
			</div>
			<div class="z-10 ml-auto mr-4 mb-2">
				<ThemeToggle />
			</div>
		</footer>
	</div>
</template>

<script lang="ts" setup>
	import type { UserType } from '~/types';

	const { logout, isAuthenticated } = useSanctumAuth();
	const user = computed(() => useSanctumUser<UserType>().value?.user);
</script>
