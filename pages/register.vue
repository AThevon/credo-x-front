<template>
	<div class="max-w-md mx-auto p-6 rounded-lg shadow-md">
		<h1 class="text-2xl font-semibold text-center mb-6">Créer un compte</h1>
		<form @submit.prevent="handleSubmit" class="space-y-4">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700"
					>Nom</label
				>
				<UInput
					id="name"
					v-model="form.name"
					placeholder="Votre nom"
					required
					class="mt-1 w-full"
				/>
			</div>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700"
					>Email</label
				>
				<UInput
					id="email"
					v-model="form.email"
					type="email"
					placeholder="Votre email"
					required
					class="mt-1 w-full"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700"
					>Mot de passe</label
				>
				<UInput
					id="password"
					v-model="form.password"
					type="password"
					placeholder="Votre mot de passe"
					required
					class="mt-1 w-full"
				/>
			</div>
			<div>
				<label
					for="password_confirmation"
					class="block text-sm font-medium text-gray-700"
					>Confirmez le mot de passe</label
				>
				<UInput
					id="password_confirmation"
					v-model="form.password_confirmation"
					type="password"
					placeholder="Confirmez votre mot de passe"
					required
					class="mt-1 w-full"
				/>
			</div>
			<div>
				<UButton
					type="submit"
					class="w-full bg-blue-500 text-white hover:bg-blue-600"
				>
					S'inscrire
				</UButton>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
	import fetching from '@/utils/fetching';

	definePageMeta({
		middleware: ['sanctum:guest'],
	});

	const router = useRouter();
	const toast = useToast();

	const form = ref({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	});

	const handleSubmit = async () => {
		try {
			await fetching('/register', {
				method: 'POST',
				body: form.value,
			});
			toast.add({
				title: 'Inscription réussie',
				description: 'Votre compte a été créé avec succès.',
				icon: 'i-octicon-desktop-download-24',
			});
			router.push('/login');
		} catch (error) {
			toast.add({
				title: 'Erreur lors de l’inscription',
				description: 'Veuillez vérifier vos informations et réessayer.',
			});
			console.error(error);
		}
	};
</script>
