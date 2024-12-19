<template>
	<div class="flex items-center justify-center min-h-[80vh]">
		<div class="w-full max-w-sm">
			<h2 class="mb-4 text-2xl font-bold uppercase text-center">Connexion</h2>
			<UForm
				:schema="schema"
				:state="state"
				class="space-y-4"
				@submit="handleLogin"
			>
				<UFormGroup label="Email" name="email">
					<UInput
						size="lg"
						id="email"
						v-model="state.email"
						type="email"
						icon="i-material-symbols-alternate-email"
					/>
				</UFormGroup>

				<UFormGroup label="Mot de passe" name="password">
					<UInput
						size="lg"
						id="password"
						v-model="state.password"
						type="password"
						icon="i-solar-lock-password-bold"
					/>
				</UFormGroup>

				<UButton
					padded
					block
					type="submit"
					label="Se connecter"
					size="xl"
					class="group transition-all active:scale-[0.98]"
				>
					<template #trailing>
						<UIcon
							name="i-heroicons-arrow-right-20-solid"
							class="transition-all h-5 w-0 group-hover:w-5"
						/>
					</template>
				</UButton>
			</UForm>

			<p class="text-center mt-4 text-sm text-neutral-500">
				Vous n'avez pas de compte ?
				<UButton to="/register" class="text-primary p-0 ml-1" variant="link">
					Inscrivez-vous
				</UButton>
			</p>

			<UDivider class="my-4" label="OU" />

			<div class="text-center">
				<UButton
					padded
					block
					label="Connexion avec Google"
					icon="i-gg-google"
					size="xl"
					color="blue"
					@click="handleGoogleLogin"
					class="group !text-neutral-50"
				>
					<template #trailing>
						<UIcon
							name="i-heroicons-arrow-right-20-solid"
							class="w-0 transition-all group-hover:w-5 h-5"
						/>
					</template>
				</UButton>
			</div>
			<p class="text-center mt-8 text-sm text-neutral-500">
				En vous connectant, vous acceptez nos
				<UButton to="/terms" class="text-primary p-0 ml-1" variant="link"
					>Conditions d'utilisation</UButton
				>
				et notre
				<UButton to="/privacy" class="text-primary p-0 ml-1" variant="link"
					>Politique de confidentialité</UButton
				>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { z } from 'zod';
	import type { FormSubmitEvent } from '#ui/types';
	import { useUserStore } from '@/stores/UserStore';

	const toast = useToast();
	const passport = useRuntimeConfig();
	console.log(passport);
	const userStore = useUserStore();

	// Schéma de validation avec zod
	const schema = z.object({
		email: z.string().email('Veuillez entrer un email valide.'),
		password: z
			.string()
			.min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
	});

	type Schema = z.output<typeof schema>;

	// État réactif pour le formulaire
	const state = reactive({
		email: '',
		password: '',
	});

	async function handleLogin(event: FormSubmitEvent<Schema>) {
		try {
			const response: any = await $fetch('/api/login', {
				method: 'POST',
				body: {
					email: event.data.email,
					password: event.data.password,
				},
			});

			// Stocke le token dans un cookie sécurisé
			const token = useCookie('access_token', {
				maxAge: 60 * 60 * 24 * 7, // 7 jours
				httpOnly: true, // Non accessible via JS
				secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en production
			});
			token.value = response.access_token;

			// Optionnel : charge les informations utilisateur dans le Pinia
			const userStore = useUserStore();
			await userStore.fetchUser();

			toast.add({
				color: 'green',
				title: 'Connexion réussie',
				description: 'Vous êtes maintenant connecté.',
			});

			await navigateTo('/');
		} catch (error) {
			console.error('Login Error:', error);
			toast.add({
				color: 'red',
				title: 'Erreur',
				description: 'Email ou mot de passe incorrect.',
			});
		}
	}

	async function handleGoogleLogin() {
		window.location.href = `${passport.baseUrl}/auth/google/redirect`;
	}
</script>
