// entities/user/store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

interface UserStore {
	user: any
	isAuthed: boolean
	login: () => void
	logout: () => void
}

export const useUserStore = create<UserStore>()(set => ({
	user: null,
	isAuthed: false,

	login: () => {
		const token: any = localStorage.getItem('access_token')
		set({
			user: jwtDecode(token),
			isAuthed: true,
		})
	},

	logout: () => {
		localStorage.removeItem('access_token')
		set({ user: null, isAuthed: false })
	},
}))
