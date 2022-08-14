<script setup>
	import {reactive, ref} from "vue"

	const showForm = ref(false)
	const schema = reactive({
		modified_name: 'required',
		genre: 'alpha_spaces'
	})
  /*
  	props
   */
	const props = defineProps({
		song: {
			type: Object,
			required: true
		}
	})

	const edit = () => {
		console.log('song edited')
	}
</script>
<template>
	<div class="border border-gray-200 p-3 mb-4 rounded">
		<div v-show="!showForm">
			<h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
			<button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
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
			<vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
				<div class="mb-3">
					<label class="inline-block mb-2">Song Title</label>
					<vee-field type="text" name="modified_name"
						class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
							transition duration-500 focus:outline-none focus:border-black rounded"
						placeholder="Enter Song Title"
					/>
					<error-message class="text-red-600" name="modified_name" />
				</div>
				<div class="mb-3">
					<label class="inline-block mb-2">Genre</label>
					<vee-field type="text" name="genre"
						class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
							transition duration-500 focus:outline-none focus:border-black rounded"
						placeholder="Enter Genre"
					/>
					<error-message class="text-red-600" name="genre" />
				</div>
				<button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
					Submit
				</button>
				<button type="submit" class="py-1.5 px-3 rounded text-white bg-gray-600">
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