<template>
	<div class="max-w-4xl mx-auto px-6 py-12">
		<h1 class="text-3xl font-bold mb-6">Conditions générales d'utilisation</h1>
		<p class="leading-relaxed mb-4">
			Bienvenue sur notre site web. En accédant à ce site, vous acceptez d'être
			lié par ces conditions générales d'utilisation. Veuillez les lire
			attentivement.
		</p>
		<h2 class="text-xl font-semibold mt-6 mb-4">1. Accès au site</h2>
		<p class="leading-relaxed mb-4">
			L'accès au site est réservé aux utilisateurs âgés de 18 ans et plus. En
			utilisant ce site, vous confirmez être majeur.
		</p>
		<h2 class="text-xl font-semibold mt-6 mb-4">2. Propriété intellectuelle</h2>
		<p class="leading-relaxed mb-4">
			Tout le contenu disponible sur ce site (textes, images, logos, etc.) est
			protégé par des droits de propriété intellectuelle. Vous ne pouvez pas les
			reproduire sans autorisation.
		</p>
		<h2 class="text-xl font-semibold mt-6 mb-4">3. Responsabilités</h2>
		<p class="leading-relaxed mb-4">
			Nous déclinons toute responsabilité en cas de mauvaise utilisation du site
			ou de problèmes techniques. Veuillez utiliser le site de manière
			responsable.
		</p>
		<h2 class="text-xl font-semibold mt-6 mb-4">4. Modifications</h2>
		<p class="leading-relaxed mb-4">
			Nous nous réservons le droit de modifier ces conditions générales à tout
			moment. Veuillez les consulter régulièrement pour rester informé.
		</p>
		<p class="leading-relaxed">
			Si vous avez des questions sur nos conditions générales, contactez-nous à
			<a :href="`mailto:${contactEmail}`" class="text-primary underline"
				>{{ contactEmail }}</a
			>.
		</p>
	</div>
</template>

<script setup lang="ts">
	definePageMeta({
		sanctum: {
			excluded: true,
		},
	});

   const contactEmail = useRuntimeConfig().public.contactEmail;

</script>
