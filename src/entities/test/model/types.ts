export interface Test {
	id: string
	psychologist_id: string
	title: string
	description: string
	schema: {
		scales: IScale[]
		questions: IQuestion[]
	}
}

export interface IQuestion {
	id: string
	type: 'single_choice' | 'multi_choice'
	text: string
	options?: Option[]
}

export interface Option {
	id: string
	text: string
	weights: any
}

interface ILevels {
	id: string
	score_from: number
	score_to: number
	text_client: string
	text_pro: string
}

export interface IScale {
	id: string
	name: string
	min?: number
	max: number
	levels: ILevels[]
}
