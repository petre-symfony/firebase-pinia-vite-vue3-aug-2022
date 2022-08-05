<script setup>
	import { ref, reactive } from "vue"
	import { useUserStore } from '@/stores/storeUserLoggedIn.js'

	/*
		user pinia store
	 */
	const storeUser = useUserStore()

	/*
		show message alert after submit login form
		and disable submit button while is in the process of logging
	 */
	const login_in_submission = ref(false)
	const login_show_alert = ref(false)
	const login_alert_variant = ref('')
	const login_alert_msg = ref('Please wait! We are logging you in')

	/*
	outsource vee validate rules into an object
	 */
	const loginSchema = reactive({
		email: 'required|min:3|max:100|email',
		password: 'required|min:3|max:100'
	})

	/*
		login form
	 */
	const login = async (values) => {
		login_show_alert.value = true
		login_in_submission.value = true
		login_alert_variant.value = 'bg-blue-500'
		login_alert_msg.value = 'Please wait! We are logging you in'
		login_alert_variant.value = 'bg-green-500'

		try {
			await storeUser.authenticate(values)
		} catch(error) {
			login_in_submission.value = false
			login_alert_variant.value = 'bg-red-500'
			login_alert_msg.value = 'Invalid details'
			return
		}

		login_alert_msg.value = 'Success! You are now logged in'
		window.location.reload()
	}

</script>
<template>
	<div
		class="text-white text-center font-bold p-4 mb-4"
		v-if="login_show_alert"
		:class="login_alert_variant"
	>
		{{ login_alert_msg }}
	</div>
	<vee-form
		:validation-schema="loginSchema"
		@submit="login"
	>
		<!-- Email -->
		<div class="mb-3">
			<label class="inline-block mb-2">Email</label>
			<vee-field type="email" name="email"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Email"
			/>
			<error-message class="text-red-600" name="email"/>
		</div>
		<!-- Password -->
		<div class="mb-3">
			<label class="inline-block mb-2">Password</label>
			<vee-field type="password" name="password"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
				duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Password" />
			<error-message class="text-red-600" name="password"/>
		</div>
		<button type="submit" :disabled="login_in_submission"
			class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
			hover:bg-purple-700"
		>
			Submit
		</button>
	</vee-form>
</template>

<script>
export default {
	name: "LoginForm"
}
</script>
