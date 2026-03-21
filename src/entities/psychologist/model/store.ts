import { create } from 'zustand'
import type { Psychologist, UpdatePsychologistDto } from './types'
import {
	getPsychologistProfile,
	updatePsychologistProfile,
	createPsychologistProfile,
} from './api'

interface PsychologistStore {
	profile: Psychologist | null
	loading: boolean
	error: string | null
	loadProfile: (userId: string) => Promise<void>
	updateProfile: (userId: string, data: UpdatePsychologistDto) => Promise<void>
	clearProfile: () => void
}

export const usePsychologistStore = create<PsychologistStore>((set, get) => ({
	profile: null,
	loading: false,
	error: null,

	loadProfile: async (userId: string) => {
		set({ loading: true, error: null })
		try {
			// Сначала пробуем получить существующий профиль
			let profile = await getPsychologistProfile(userId)

			// Если профиля нет, создаём новый
			if (!profile) {
				// Берем имя из токена или используем дефолтное
				const token = localStorage.getItem('access_token')
				const defaultName = token ? atob(token.split('.')[1]).split('"name":"')[1]?.split('"')[0] : 'Психолог'
				profile = await createPsychologistProfile(userId, defaultName || 'Психолог')
			}

			if (profile) {
				set({ profile, loading: false })
			} else {
				set({ loading: false, error: 'Не удалось загрузить профиль' })
			}
		} catch (err) {
			set({ loading: false, error: 'Ошибка загрузки профиля' })
		}
	},

	updateProfile: async (userId: string, data: UpdatePsychologistDto) => {
		set({ loading: true, error: null })
		try {
			const updatedProfile = await updatePsychologistProfile(userId, data)
			if (updatedProfile) {
				set({ profile: updatedProfile, loading: false })
			} else {
				set({ loading: false, error: 'Не удалось обновить профиль' })
			}
		} catch (err) {
			set({ loading: false, error: 'Ошибка обновления профиля' })
		}
	},

	clearProfile: () => {
		set({ profile: null, loading: false, error: null })
	},
}))
