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
			<div class="flex space-x-2">
				<UButton
					padded
					to="/register"
					label="S'inscrire"
					size="lg"
					class="btn !bg-neutral-800 hover:!bg-neutral-700 dark:!bg-neutral-700 hover:dark:!bg-neutral-800"
				/>
				<UButton
					padded
					to="/login"
					label="Se connecter"
					size="lg"
					class="btn"
				/>
			</div>
			<div class="flex space-x-2">
				<!-- <h3 v-if="user" class="text-sm">Bonjour, {{ user.name }}</h3> -->
				<UButton
					padded
					to="/profile"
					label="Mon compte"
					size="lg"
					class="btn"
				/>
				<UButton
					padded
					to="/register"
					label="Se déconnecter"
					size="lg"
					class="btn !bg-neutral-800 hover:!bg-neutral-700 dark:!bg-neutral-700 hover:dark:!bg-neutral-800"
				/>
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
</script>
