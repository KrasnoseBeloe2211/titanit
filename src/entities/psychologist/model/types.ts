export interface Psychologist {
	id: string
	user_id: string
	name: string
	photo?: string
	description?: string
}

export interface UpdatePsychologistDto {
	name?: string
	photo?: string
	description?: string
}
