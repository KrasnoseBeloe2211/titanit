import { apiController } from '@/shared/config/api/api'
import type { Psychologist, UpdatePsychologistDto } from './types'

export const getPsychologistProfile = async (userId: string) => {
	try {
		const response = await apiController<Psychologist>('GET', `/psychologist?user_id=${userId}`)
		return response.data
	} catch (error) {
		console.error('Ошибка загрузки профиля психолога', error)
		return null
	}
}

export const updatePsychologistProfile = async (
	userId: string,
	data: UpdatePsychologistDto
) => {
	try {
		const response = await apiController<Psychologist>('PATCH', `/psychologist?user_id=${userId}`, data)
		return response.data
	} catch (error) {
		console.error('Ошибка обновления профиля психолога', error)
		return null
	}
}

export const createPsychologistProfile = async (userId: string, name: string) => {
	try {
		const response = await apiController<Psychologist>('POST', '/psychologist', {
			user_id: userId,
			name,
		})
		return response.data
	} catch (error) {
		console.error('Ошибка создания профиля психолога', error)
		return null
	}
}
