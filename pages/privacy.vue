<template>
	<div class="max-w-4xl mx-auto px-6 py-12">
		<h1 class="text-3xl font-bold mb-6">Politique de confidentialité</h1>
		<p class="leading-relaxed mb-4">
			Nous respectons votre vie privée et nous nous engageons à protéger vos
			données personnelles. Cette politique explique comment nous collectons,
			utilisons et protégeons vos informations.
		</p>
		<h2 class="text-xl font-semibold mt-6 mb-4">1. Données collectées</h2>
		<p class="leading-relaxed mb-4">
			Nous collectons les informations suivantes :
		</p>
		<ul class="pl-5 leading-relaxed mb-4">
			<li>Votre nom et votre adresse email lors de l'inscription.</li>
			<li>
				Des données techniques comme votre adresse IP et votre navigateur.
			</li>
		</ul>
		<h2 class="text-xl font-semibold mt-6 mb-4">2. Utilisation des données</h2>
		<p class="leading-relaxed mb-4">
			Nous utilisons vos données pour :
		</p>
		<ul class="pl-5 leading-relaxed mb-4">
			<li>⮕ Créer et gérer votre compte utilisateur.</li>
			<li>⮕ Améliorer nos services et analyser le trafic.</li>
			<li>⮕ Vous contacter en cas de besoin (support, notifications, etc.).</li>
		</ul>
		<h2 class="text-xl font-semibold mt-6 mb-4">3. Partage des données</h2>
		<p class="leading-relaxed mb-4">
			Nous ne partageons pas vos données personnelles avec des tiers, sauf dans
			les cas suivants :
		</p>
		<ul class="pl-5 leading-relaxed mb-4">
			<li>⮕ Obligation légale (demande des autorités).</li>
			<li>
				⮕ Partenaires techniques pour fournir nos services (hébergement, emails).
			</li>
		</ul>
		<h2 class="text-xl font-semibold mt-6 mb-4">4. Vos droits</h2>
		<p class="leading-relaxed mb-4">
			Conformément au RGPD, vous avez le droit de :
		</p>
		<ul class="pl-5 leading-relaxed mb-4">
			<li>⮕ Consulter les données que nous avons sur vous.</li>
			<li>⮕ Demander leur suppression ou leur rectification.</li>
			<li>⮕ Retirer votre consentement à tout moment.</li>
		</ul>
		<p class="leading-relaxed">
			Pour toute question ou demande, contactez-nous à
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
