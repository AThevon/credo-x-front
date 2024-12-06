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
		'nuxt-auth-sanctum',
		'@nuxtjs/tailwindcss',
	],
	sanctum: {
		mode: 'cookie',
		userStateKey: 'sanctum.user.identity',
		redirectIfAuthenticated: false,
		redirectIfUnauthenticated: false,
		endpoints: {
			csrf: '/sanctum/csrf-cookie',
			login: '/login',
			logout: '/logout',
			user: '/api/user',
		},
		csrf: {
			cookie: 'XSRF-TOKEN',
			header: 'X-XSRF-TOKEN',
		},
		client: {
			retry: true,
			initialRequest: true,
		},
		redirect: {
			keepRequestedRoute: false,
			onLogin: '/',
			onLogout: '/login',
			onAuthOnly: '/login',
			onGuestOnly: '/',
		},
		globalMiddleware: {
			enabled: true,
			allow404WithoutAuth: false,
		},
		logLevel: 3,
		appendPlugin: false,
	},
	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL,
			contactEmail: process.env.CONTACT_EMAIL,
			sanctum: {
				baseUrl: process.env.BASE_URL || 'http://localhost:8000',
			},
		},
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
