import { defineStore } from "pinia"
import {createUserWithEmailAndPassword} from "firebase/auth";
import {firebaseAuth, usersCollection} from "@/includes/firebase";
import { addDoc } from "firebase/firestore";

export const useUserStore = defineStore('user', {
	state: () => ({
		userLoggedIn: false
	}),
	actions: {
		async register(values) {
			await createUserWithEmailAndPassword(
				firebaseAuth,
				values.email,
				values.password
			)
			await addDoc(usersCollection, {
				name: values.name,
				email: values.email,
				age: values.age,
				country: values.country
			})
			this.userLoggedIn = true
		}
	}
})
