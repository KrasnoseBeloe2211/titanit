'use client'

import { IScale } from '@/entities/test'
import { AddScale, QuestionConst, ScalesView } from '@/widjets'
import { Box } from '@mui/material'
import { useState } from 'react'

export const Constructor = () => {
	const [scales, setScales] = useState<IScale[]>([])
	return (
		<Box>
			<AddScale setScales={setScales} scales={scales}/>
			<ScalesView scales={scales}/>
			<QuestionConst />
		</Box>
	)
}
