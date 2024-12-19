import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: null,
		user: null,
	}),

	actions: {
		async fetchUser() {
			try {
				const config = useRuntimeConfig()?.public;

				// Ajoutez le token Bearer pour les requêtes authentifiées
				const user: any = await $fetch(`${config.baseUrl}/api/user`, {
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				});

				this.user = user;
			} catch (error) {
				console.error('Failed to fetch user:', error);
				throw new Error('Failed to fetch user');
			}
		},

		logout() {
			this.token = null;
			this.user = null;
		},
	},
});
