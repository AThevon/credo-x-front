// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-30',
	devtools: { enabled: true },
	tailwindcss: {
		cssPath: '~/assets/css/main.css',
	},
	modules: [
		'@nuxt/ui',
		'@nuxt/image',
		'@nuxt/fonts',
		'@nuxtjs/tailwindcss',
		'dayjs-nuxt',
		'@pinia/nuxt',
	],
	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL,
			contactEmail: process.env.CONTACT_EMAIL,
		},
		passport: {
			baseUrl: process.env.BASE_URL,
			clientId: process.env.PASSPORT_CLIENT_ID,
			clientSecret: process.env.PASSPORT_CLIENT_SECRET,
		},
	},
	dayjs: {
		locales: ['fr', 'en'],
		defaultLocale: 'fr',
	},
	colorMode: {
		preference: 'light',
	},
	app: {
		pageTransition: {
			name: 'slide-fade',
			mode: 'out-in',
		},
	},
	fonts: {
		defaults: {
			weights: [400],
			styles: ['normal', 'italic'],
			subsets: [
				'cyrillic-ext',
				'cyrillic',
				'greek-ext',
				'greek',
				'vietnamese',
				'latin-ext',
				'latin',
			],
		},
	},
});
