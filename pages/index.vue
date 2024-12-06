<template>
	<div class="max-w-[100rem] mx-auto">
		<h2 class="title text-6xl my-4 ml-10">Mes Transactions</h2>
		<div class="flex w-full gap-4 px-20 mt-8">
			<div class="w-full">
				<TransactionList type="income" />
			</div>
			<div class="w-full">
				<TransactionList type="expense" />
			</div>
      <div class="w-1/2">
        <TotalCard />
      </div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
