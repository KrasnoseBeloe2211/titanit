'use client'

import { create } from 'zustand'
<<<<<<< HEAD
=======
import type { IUser } from './type'
import { getCookie } from '@/shared/helpers/index'
>>>>>>> 0bcce2e8e1f26da3f59ac514b3b352eaf824a25c
import { jwtDecode } from 'jwt-decode'

interface IUserStore extends IUser {
	isAuthed: boolean
<<<<<<< HEAD
	initialize: () => void
	login: () => void
	logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
=======
	setAuth: () => void
}

const defaultState: Omit<IUserStore, 'setAuth'> = {
	email: '',
	user: {},
	jwt_refresh: '',
>>>>>>> 0bcce2e8e1f26da3f59ac514b3b352eaf824a25c
	isAuthed: false,
}

<<<<<<< HEAD
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
=======
const getInitialState = () => {
	if (typeof window === 'undefined') {
		return defaultState
	}

	const token = localStorage.getItem('access_token')
	if (!token) {
		return defaultState
	}
	try {
		const decoded = jwtDecode(token)
		return {
			email: decoded.sub || '',
			user: decoded,
			jwt_refresh: getCookie('refresh_token'),
			isAuthed: true,
		}
	} catch {
		return defaultState
	}
}

export const useUserStore = create<IUserStore>(set => ({
	...getInitialState(),
	setAuth: () => {
		if (typeof window === 'undefined') {
			set({ isAuthed: false })
			return
		}
		const token = localStorage.getItem('access_token')
		if (!token) {
			set({ isAuthed: false })
			return
		}
		const decoded = jwtDecode(token)
		set({
			isAuthed: true,
			user: decoded,
			jwt_refresh: getCookie('refresh_token'),
		})
>>>>>>> 0bcce2e8e1f26da3f59ac514b3b352eaf824a25c
	},
}))
