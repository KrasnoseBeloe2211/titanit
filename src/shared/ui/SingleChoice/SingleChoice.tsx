import { IQuestion, IScale, Option } from '@/entities/test'
import { ArrowDropDown } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControl,
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	TextField,
} from '@mui/material'

export const SingleChoice = ({
	data,
	scales,
	onChange,
	question,
	isDropped,
}: {
	data: Option[]
	scales: IScale[]
	question: IQuestion
	onChange: any
	isDropped: boolean
}) => {
	const handleWeightChange = (
		optionId: string,
		scaleId: string,
		value: string,
	) => {
		const updateOptions = data.map((opt: Option) => {
			opt.id === optionId
				? { ...opt, weights: { ...opt.weights, [scaleId]: value } }
				: opt
		})
		onChange?.({ ...question, options: updateOptions })
	}

	const handleAnswerChange = (value: string, optionId: string) => {
		const updateOptions = data.map((opt: Option) =>
			opt.id === optionId ? { ...opt, text: value } : opt,
		)
		onChange?.({ ...question, options: updateOptions })
	}

	return (
		<Box>
			<RadioGroup>
				{data.map((opt: Option) => (
					<Box key={opt.id}>
						<FormControlLabel
							control={<Radio disabled={!isDropped} />}
							label={
								<TextField
									size='small'
									value={opt.text}
									onChange={e => handleAnswerChange(e.target.value, opt.id)}
									disabled={!isDropped}
									label='Ответ'
									onClick={e => e.stopPropagation()}
								/>
							}
						/>
						<Accordion>
							<AccordionSummary expandIcon={<ArrowDropDown />}>
								Разбалловка по шкалам
							</AccordionSummary>
							<AccordionDetails>
								{scales?.map((scale: IScale) => (
									<TextField
										value={opt.weights[scale.id]}
										onChange={e =>
											handleWeightChange(opt.id, scale.id, e.target.value)
										}
										disabled={!isDropped}
										key={scale.id}
										type='number'
									/>
								))}
							</AccordionDetails>
						</Accordion>
					</Box>
				))}
			</RadioGroup>
		</Box>
	)
}
