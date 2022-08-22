<script setup>
	import AppHeader from '@/components/Header.vue'
	import AuthModal from '@/components/Auth.vue'
	import AppPlayer from '@/components/Player.vue'
</script>
<template>
	<app-header />

	<router-view></router-view>

	<app-player />

	<auth-modal />
</template>
<script>
	export default {
		name: 'App'
	};
</script>
