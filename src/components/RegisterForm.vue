<script setup>
	import { ref, reactive } from 'vue'
	import { firebaseAuth, usersCollection } from '@/includes/firebase.js'
	import { createUserWithEmailAndPassword } from 'firebase/auth'
	import { addDoc } from 'firebase/firestore'

	/*
	outsource vee validate rules into an object
	 */
	const schema = reactive({
		name: 'required|min:3|max:100|alpha_spaces',
		email: 'required|min:3|max:100|email',
		age: 'required|min_value:18|max_value:100',
		password: 'required|min:3|max:100',
		confirm_password: 'passwords_mismatch:@password',
		country: 'required|country_excluded:Antarctica',
		tos: 'tos'
	})

	/*
		default register form value
	 */
	const userData = reactive({
		country: 'USA'
	})

	/*
		show message alert after submit registration form
		and disable submit button while acount is created
	 */
	const reg_in_submission = ref(false)
	const reg_show_alert = ref(false)
	const reg_alert_variant = ref('')
	const reg_alert_msg = ref('Please wait! Your account is being created.')

	const register = async (values) => {
		reg_show_alert.value = true
		reg_in_submission.value = true
		reg_alert_variant.value = 'bg-blue-500'
		reg_alert_msg.value = 'Please wait! Your account is being created.'

		let userCred = null
		try {
			userCred = await createUserWithEmailAndPassword(firebaseAuth, values.email, values.password)
		} catch(errors) {
			reg_in_submission.value = false
			reg_alert_variant.value = 'bg-red-500'
			reg_alert_msg.value = 'An unexpected error occured. Please try again later'
			return
		}

		try {
			await addDoc(usersCollection, {
				name: values.name,
				email: values.email,
				age: values.age,
				country: values.country
			})
		} catch (errors) {
			reg_in_submission.value = false;
			reg_alert_variant.value = 'bg-red-500';
			reg_alert_msg.value = 'An unexpected error occured. Please try again later';
			return;
		}


		reg_alert_variant.value = 'bg-green-500'
		reg_alert_msg.value = 'Success! Your account has been created.'
		console.log(userCred)
	}
</script>
<template>
	<div
		class="text-white text-center font-bold p-5 mb-4"
		v-if="reg_show_alert"
		:class="reg_alert_variant"
	>
		{{ reg_alert_msg }}
	</div>
	<vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
		<!-- Name -->
		<div class="mb-3">
			<label class="inline-block mb-2">Name</label>
			<vee-field type="text" name="name"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Name"
			/>
			<error-message class="text-red-600" name="name" />
		</div>
		<!-- Email -->
		<div class="mb-3">
			<label class="inline-block mb-2">Email</label>
			<vee-field type="email" name="email"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Email" />
			<error-message class="text-red-600" name="email"/>
		</div>
		<!-- Age -->
		<div class="mb-3">
			<label class="inline-block mb-2">Age</label>
			<vee-field type="number" name="age"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded" />
			<error-message class="text-red-600" name="age" />
		</div>
		<!-- Password -->
		<div class="mb-3">
			<label class="inline-block mb-2">Password</label>
			<vee-field name="password" :bails="false" v-slot="{ field, errors }">
				<input type="password" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
					duration-500 focus:outline-none focus:border-black rounded"
					placeholder="Password"
					v-bind="field"
				/>
				<div
					class="text-red-600"
					v-for="error in errors"
					:key="error"
				>
					{{ error }}
				</div>
			</vee-field>
			<error-message class="text-red-600" name="password" />
		</div>
		<!-- Confirm Password -->
		<div class="mb-3">
			<label class="inline-block mb-2">Confirm Password</label>
			<vee-field type="password" name="confirm_password"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Confirm Password" />
			<error-message class="text-red-600" name="confirm_password" />
		</div>
		<!-- Country -->
		<div class="mb-3">
			<label class="inline-block mb-2">Country</label>
			<vee-field as="select" name="country"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded">
				<option value="USA">USA</option>
				<option value="Mexico">Mexico</option>
				<option value="Germany">Germany</option>
				<option value="Antarctica">Antarctica</option>
			</vee-field>
			<error-message class="text-red-600" name="country" />
		</div>
		<!-- TOS -->
		<div class="mb-3 pl-6">
			<vee-field type="checkbox" name="tos" value="1"
				class="w-4 h-4 float-left -ml-6 mt-1 rounded"
			/>
			<label class="inline-block">Accept terms of service</label>
			<error-message class="text-red-600 block" name="tos" />
		</div>
		<button type="submit" :disabled="reg_in_submission"
			class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
			hover:bg-purple-700"
		>
			Submit
		</button>
	</vee-form>
</template>

<script>
export default {
	name: "RegisterForm"
}
</script>
