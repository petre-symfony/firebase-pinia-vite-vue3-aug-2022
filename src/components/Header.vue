<script setup>
	import { useAuthModalShow } from '@/stores'
	import { useUserStore } from '@/stores/storeUserLoggedIn.js'
	/*
		store
	 */
	const storeAuthModalShow = useAuthModalShow()

	/*
		user pinia store
	 */
	const storeUser = useUserStore()
</script>
<template>
	<!-- Header -->
	<header id="header" class="bg-gray-700">
		<nav class="container mx-auto flex justify-start items-center py-5 px-4">
			<!-- App Name -->
			<router-link class="text-white font-bold uppercase text-2xl mr-4" to="/about">Music</router-link>

			<div class="flex flex-grow items-center">
				<!-- Primary Navigation -->
				<ul class="flex flex-row mt-1">
					<!-- Navigation Links -->
					<li v-if="!storeUser.userLoggedIn">
						<a class="px-2 text-white" href="#" @click.prevent="storeAuthModalShow.toggleAuthModal()">
							Login / Register
						</a>
					</li>
					<template v-else>
						<li>
							<a class="px-2 text-white" href="#">Manage</a>
						</li>
						<li>
							<a class="px-2 text-white" href="#" @click.prevent="storeUser.signOut">Logout</a>
						</li>
					</template>
				</ul>
			</div>
		</nav>
	</header>
</template>
<script>
	export default {
		name: 'Header'
	};
</script>
