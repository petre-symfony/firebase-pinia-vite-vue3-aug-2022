import { defineStore } from "pinia"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {firebaseAuth, firebaseFirestore } from "@/includes/firebase";
import { doc, setDoc } from "firebase/firestore";

export const useUserStore = defineStore('user', {
	state: () => ({
		userLoggedIn: false
	}),
	actions: {
		async register(values) {
			const userCredentials = await createUserWithEmailAndPassword(
				firebaseAuth,
				values.email,
				values.password
			)

			// Create an initial document to update.
			const userUidDocRef = doc(firebaseFirestore, "users", userCredentials.user.uid)
			await setDoc(userUidDocRef, {
				name: values.name,
				email: values.email,
				age: values.age,
				country: values.country
			})

			await updateProfile(userCredentials.user, {
				displayName: values.name
			})


			this.userLoggedIn = true
		}
	}
})
