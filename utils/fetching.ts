export default async function fetching(url: string, options: any = {}) {
	const baseUrl = useRuntimeConfig().passport.baseUrl;
	const token = useCookie('access_token').value;

	options.headers = {
		...options.headers,
		Authorization: token ? `Bearer ${token}` : '',
		'Content-Type': 'application/json',
	};

	return await $fetch(`${baseUrl}/api${url}`, options);
}
