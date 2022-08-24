<script setup>
	import { firebaseFirestore, firebaseAuth, commentsCollection } from '@/includes/firebase.js'
	import { useUserStore } from '@/stores/storeUserLoggedIn.js'
	import { usePlayer } from "@/stores/player.js"
	import { doc, getDoc, addDoc, query, where, getDocs, runTransaction } from 'firebase/firestore'
	import { useRoute, useRouter } from 'vue-router'
	import { ref, reactive, computed, watch } from 'vue'

	const song = reactive({})
	const schema = {
		comment: 'required|min:3'
	}
	const comment_in_submission = ref(false)
	const comment_show_alert = ref(false)
	const comment_alert_variant = ref('bg-blue-500')
	const comment_alert_message = ref('Please wait! Your comment is being submitted')
	const comments = reactive([])
	/*
		'1' sort songs from the latest posted to the oldest
		otherwise display songs from oldest to latest
	 */
	const sort = ref('1')
	/*
		create route and router object
	 */
	const route = useRoute()
	const router = useRouter()

	/*
		user pinia store
	 */
	const storeUser = useUserStore()

	/*
		store the song data in a state when play button is hit
	 */
	const storeSongToPlay = usePlayer()

	/*
		computed
	 */
	const sortedComments = computed(() => {
		return comments.slice().sort((a, b) => {
			if (sort.value === '1') {
				return new Date(b.datePosted) - new Date(a.datePosted)
			}

			return new Date(a.datePosted) - new Date(b.datePosted)
		})
	})

	/*
		methods
	 */
	const getComments = async () => {
		const q = query(commentsCollection, where('sid', '==', route.params.id))

		const querySnapshot = await getDocs(q)

		comments.length = 0

		querySnapshot.forEach((doc) => {
			comments.push({
				docId: doc.id,
				...doc.data()
			})
		})
	}

	const getSong = async () => {
		const docRef = doc(firebaseFirestore, "songs", route.params.id)
		const docSnapshot = await getDoc(docRef)

		if (!docSnapshot.exists) {
			router.push({ name: 'home'})
			return
		}

		getComments()

		Object.entries(docSnapshot.data()).forEach(([key, value]) => {
			song[key] = value
		})
	}

	const addComment = async (values, { resetForm }) => {
		comment_in_submission.value = true
		comment_show_alert.value = true
		comment_alert_variant.value = 'bg-blue-500'
		comment_alert_message.value = 'Please wait! Your comment is being submitted'

		const comment = {
			content: values.comment,
			datePosted: new Date().toString(),
			sid: route.params.id,
			name: firebaseAuth.currentUser.displayName,
			uid: firebaseAuth.currentUser.uid
		}

		await addDoc(commentsCollection, comment)

		song.comment_count += 1

		await runTransaction(firebaseFirestore, async (transaction) => {
			const songRef = doc(firebaseFirestore, 'songs', route.params.id)

			transaction.update(songRef, {
				comment_count: song.comment_count
			})
		})

		getComments()

		comment_in_submission.value = false
		comment_alert_variant.value = 'bg-green-500'
		comment_alert_message.value = 'Comment added'

		resetForm()
	}

	/*
			get song data and comments associated with this song when component load
	 */
	getSong()

	/*
		watch for changes in sort value
	 */
	watch(sort, (newVal, oldVal) => {
		if (newVal === route.query.sort) {
			return
		}

		router.push({
			query: {
				sort: newVal
			}
		})
	})

	/*
	  update sort property if there's a sort parameter in the query route object
	 */
	const sortQuery = route.query.sort
	sort.value = sortQuery === '1' || sortQuery === '2' ? sortQuery : '1'
</script>
<template>
	<main>
		<section class="w-full mb-8 py-14 text-center text-white relative">
			<div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
				style="background-image: url(/assets/img/song-header.png)">
			</div>
			<div class="container mx-auto flex items-center">
				<!-- Play/Pause button -->
				<button
					@click.prevent="storeSongToPlay.newSong(song)"
					type="button"
					class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
				>
					<i class="fas" :class="{'fa-play': !storeSongToPlay.playing, 'fa-pause': storeSongToPlay.playing }"></i>
				</button>
				<div class="z-50 text-left ml-8">
					<div class="text-3xl font-bold">{{ song.modified_name }}</div>
					<div>{{ song.genre }}</div>
				</div>
			</div>
		</section>
		<section class="container mx-auto mt-6" id="comments">
			<div class="bg-white rounded border border-gray-200 relative flex flex-col">
				<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
					<span class="card-title">Comments ({{ song.comment_count }})</span>
					<i class="fa fa-comments float-right text-green-400 text-2xl"></i>
				</div>
				<div class="p-6">
					<div class="text-white text-center font-bold p-4 mb-4"
				 		v-if="comment_show_alert" :class="comment_alert_variant"
					>{{ comment_alert_message }}</div>
					<vee-form :validation-schema="schema" @submit="addComment" v-if="storeUser.userLoggedIn">
          	<vee-field as="textarea" name="comment"
							class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
              duration-500 focus:outline-none focus:border-black rounded mb-4"
							placeholder="Your comment here...">
						</vee-field>
						<error-message class="text-red-600 block" name="comment" />
						<button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600"
							:disabled="comment_in_submission"
						>Submit</button>
					</vee-form>

					<select v-model="sort"
						class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition
          	duration-500 focus:outline-none focus:border-black rounded"
					>
						<option value="1">Latest</option>
						<option value="2">Oldest</option>
					</select>
				</div>
			</div>
		</section>
		<ul class="container mx-auto">
			<li class="p-6 bg-gray-50 border border-gray-200" v-for="comment in sortedComments" :key="comment.docID">
				<!-- Comment Author -->
				<div class="mb-5">
					<div class="font-bold">{{ comment.name }}</div>
					<time>{{ comment.datePosted }}</time>
				</div>

				<p>
					{{ comment.content }}
				</p>
			</li>
		</ul>
	</main>
</template>

<script>
export default {
	name: "Song"
}
</script>
