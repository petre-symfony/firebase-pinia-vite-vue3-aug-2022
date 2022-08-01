import { defineStore } from "pinia"

export const useAuthModalShow = defineStore('storeAuthModalShow', {
	state: () => {
		return {
			authModalShow: false
		}
	},
	actions: {
		toggleAuthModal() {
			this.authModalShow = !this.authModalShow
		}
	}
})
