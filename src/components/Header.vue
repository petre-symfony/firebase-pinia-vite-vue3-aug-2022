<script setup>
	import { useAuthModalShow } from '@/stores'
	import { useUserStore } from '@/stores/storeUserLoggedIn.js'
	import { useRouter, useRoute } from 'vue-router'
	/*
	router
 */
	const router = useRouter()
	const route = useRoute()
	/*
		/*
			store
		 */
	const storeAuthModalShow = useAuthModalShow()

	/*
		user pinia store
	 */
	const storeUser = useUserStore()

	const signOut = () => {
		storeUser.signOut()
		if (route.meta.requiresAuth) {
			router.push({ name: "home" })
		}
	}
</script>
<template>
	<!-- Header -->
	<header id="header" class="bg-gray-700">
		<nav class="container mx-auto flex justify-start items-center py-5 px-4">
			<!-- App Name -->
			<router-link class="text-white font-bold uppercase text-2xl mr-4"
		 		:to="{ name: 'home' }" exact-active-class="no-active"
			>Music</router-link>

			<div class="flex flex-grow items-center">
				<!-- Primary Navigation -->
				<ul class="flex flex-row mt-1">
					<!-- Navigation Links -->
					<li>
						<router-link class="px-2 text-white" :to="{ name: 'about' }">
							About
						</router-link>
					</li>
					<li v-if="!storeUser.userLoggedIn">
						<a class="px-2 text-white" href="#" @click.prevent="storeAuthModalShow.toggleAuthModal()">
							Login / Register
						</a>
					</li>
					<template v-else>
						<li>
							<router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
						</li>
						<li>
							<a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
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
