// entities/user/store.ts
import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

interface UserStore {
	user: any
	isAuthed: boolean
	initialize: () => void
	login: () => void
	logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	isAuthed: false,

	initialize: () => {
		const token = localStorage.getItem('access_token')
		if (token) {
			try {
				const decoded = jwtDecode(token)
				set({
					user: decoded,
					isAuthed: true,
				})
			} catch {
				set({ user: null, isAuthed: false })
			}
		}
	},

	login: () => {
		const token: any = localStorage.getItem('access_token')
		if (token) {
			set({
				user: jwtDecode(token),
				isAuthed: true,
			})
		}
	},

	logout: () => {
		localStorage.removeItem('access_token')
		set({ user: null, isAuthed: false })
	},
}))
