<template>
	<NuxtRouteAnnouncer />
	<NuxtLayout>
      <UNotifications />
		<NuxtPage />
	</NuxtLayout>
	<UNotifications />
</template>

<style>
	.slide-fade-y-enter-active,
	.slide-fade-y-leave-active,
	.slide-fade-y-reverse-enter-active,
	.slide-fade-y-reverse-leave-active {
		transition: transform 0.4s ease, opacity 0.4s ease;
	}

	.slide-fade-y-enter-from {
		transform: translateY(100%);
		opacity: 0;
	}

	.slide-fade-y-leave-to {
		transform: translateY(-100%);
		opacity: 0;
	}

	.slide-fade-y-reverse-enter-from {
		transform: translateY(-100%);
		opacity: 0;
	}

	.slide-fade-y-reverse-leave-to {
		transform: translateY(100%);
		opacity: 0;
	}
</style>
