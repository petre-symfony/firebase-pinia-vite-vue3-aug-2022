<script setup>
	import AppUpload from "@/components/Upload.vue"
	import CompositionItem from "@/components/CompositionItem.vue"
	import { songsCollection, firebaseAuth } from "@/includes/firebase.js"
	import { query, where, getDocs } from 'firebase/firestore'
	import { ref, reactive } from 'vue'
	import { onBeforeRouteLeave } from 'vue-router'

	const songs = reactive([])
	const unsavedFlag = ref(false)

	/*
		Functions
	 */
	const getSongs = async () => {
		const q = query(songsCollection, where('uid', '==', firebaseAuth.currentUser.uid))

		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((doc) => {
			addSong(doc)
		})
	}

	getSongs()

	const updateSong = (i, values) => {
		songs[i].modified_name = values.modified_name
		songs[i].genre = values.genre
	}

	const removeSong = (i) => {
		songs.splice(i, 1)
	}

	const addSong = (doc) => {
		const song = {
			...doc.data(),
			docID: doc.id
		}

		songs.push(song)
	}

	const updateUnsavedFlag = (value) => {
		unsavedFlag.value = value
	}

	onBeforeRouteLeave((to, from, next) => {
		if (unsavedFlag.value == false){
			next()
		} else {
			const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
			next(leave)
		}
	})
</script>
<template>
	<section class="container mx-auto mt-6">
		<div class="md:grid md:grid-cols-3 md:gap-4">
			<div class="col-span-1">
				<app-upload :addSong="addSong" />
			</div>
			<div class="col-span-2">
				<div class="bg-white rounded border border-gray-200 relative flex flex-col">
					<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
						<span class="card-title">My Songs</span>
						<i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
					</div>
					<div class="p-6">
						<CompositionItem v-for="(song, i) in songs" :key="song.docID"
							:song="song"
							:updateSong="updateSong"
						 	:index="i"
							:removeSong="removeSong"
						 	:updateUnsavedFlag="updateUnsavedFlag"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
//import { useUserStore } from '@/stores/storeUserLoggedIn.js'

export default {
	name: "Manage",
	/*
	beforeRouteEnter(to, from, next) {
		const store = useUserStore()

		if (store.userLoggedIn) {
			next()
		} else {
			next({ name: 'home' })
		}
	}
	 */
}
</script>

<style scoped>
</style>
