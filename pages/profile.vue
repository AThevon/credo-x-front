<template>
  <div>
      <h1 class="text-2xl font-bold">Profile</h1>
      <div v-if="user">
         <p>{{ user.name }}</p>
         <p>{{ user.email }}</p>
      </div>
  </div>
</template>

<script lang="ts" setup>
	import type { UserType } from '~/types';

	const user = computed(() => useSanctumUser<UserType>().value?.user);
   
</script>