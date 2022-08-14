<script setup>
	import { reactive, ref } from "vue"
	import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
	import { ref as bucketStorageRef, deleteObject } from 'firebase/storage'
	import { firebaseFirestore, storage } from "@/includes/firebase.js"

	const showForm = ref(false)
	const schema = reactive({
		modified_name: 'required',
		genre: 'alpha_spaces'
	})
	const in_submission = ref(false)
	const show_alerts = ref(false)
	const alert_variant = ref('bg-blue-500')
	const alert_message = ref('Please wait! Updating song info')
  /*
  	props
   */
	const props = defineProps({
		song: {
			type: Object,
			required: true
		},
		updateSong: {
			type: Function,
			required: true
		},
		index: {
			type: Number,
			required: true
		},
		removeSong: {
			type: Function,
			required: true
		},
		updateUnsavedFlag: {
			type: Function
		}
	})

	const edit = async ( values ) => {
		in_submission.value = true
		show_alerts.value = true
		alert_variant.value = 'bg-blue-500'
		alert_message.value = 'Please wait! Updating song info'

		const songRef = doc(firebaseFirestore, 'songs', props.song.docID)
		try {
			await updateDoc(songRef, values)
		} catch(error) {
			in_submission.value = false
			alert_variant.value = 'bg-red-500'
			alert_message.value = 'Something went wrong! Try again later'
			return
		}

		props.updateSong(props.index, values)

		props.updateUnsavedFlag(false)

		in_submission.value = false
		alert_variant.value = 'bg-green-500'
		alert_message.value = 'Success!'
	}

	const deleteSong = async () => {
		const songRef = bucketStorageRef(storage, `songs/${props.song.original_name}`)

		await deleteObject(songRef)
		await deleteDoc(doc(firebaseFirestore, 'songs', props.song.docID))

		props.removeSong(props.index)
	}
</script>
<template>
	<div class="border border-gray-200 p-3 mb-4 rounded">
		<div v-show="!showForm">
			<h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
			<button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
				@click.prevent="deleteSong"
			>
				<i class="fa fa-times"></i>
			</button>
			<button
				class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
				@click.prevent="showForm = !showForm"
			>
				<i class="fa fa-pencil-alt"></i>
			</button>
		</div>
		<div v-show="showForm">
			<div class="text-white text-center font-bold p-4 mb-4"
				v-if="show_alerts" :class="alert_variant">
				{{ alert_message }}
			</div>
			<vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
				<div class="mb-3">
					<label class="inline-block mb-2">Song Title</label>
					<vee-field type="text" name="modified_name"
						class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
							transition duration-500 focus:outline-none focus:border-black rounded"
						placeholder="Enter Song Title"
					 	@input="updateUnsavedFlag(true)"
					/>
					<error-message class="text-red-600" name="modified_name" />
				</div>
				<div class="mb-3">
					<label class="inline-block mb-2">Genre</label>
					<vee-field type="text" name="genre"
						class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
							transition duration-500 focus:outline-none focus:border-black rounded"
						placeholder="Enter Genre"
					 	@input="updateUnsavedFlag(true)"
					/>
					<error-message class="text-red-600" name="genre" />
				</div>
				<button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600"
					:disabled="in_submission"
				>
					Submit
				</button>
				<button type="submit" class="py-1.5 px-3 rounded text-white bg-gray-600"
					:disabled="in_submission" @click.prevent="showForm = false"
				>
					Go Back
				</button>
			</vee-form>
		</div>
	</div>
</template>

<script>
export default {
	name: "CompositionItem"
}
</script>
