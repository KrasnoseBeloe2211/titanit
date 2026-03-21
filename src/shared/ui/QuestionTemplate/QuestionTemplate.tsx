import { IQuestion, IScale } from '@/entities/test'
import { NumberField } from '@base-ui/react/number-field'
import {
	Box,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material'
import { MultipleCheckbox } from '../MultipleCheckBox/MultipleCheckbox'
import { SingleChoice } from '../SingleChoice/SingleChoice'
import { ArrowDropDown } from '@mui/icons-material'
import { v4 } from 'uuid'

interface QuestionTemplateProps {
	question: IQuestion
	onChange?: (value: IQuestion) => void
	readOnly?: boolean
	isDropped?: boolean
	scales?: IScale[]
}

export const QuestionTemplate = ({
	question,
	onChange,
	scales,
	isDropped,
	readOnly = false,
}: QuestionTemplateProps) => {
	const handleAddOption = (options: any) => {
		const currentOpts = options || []

		onChange?.({
			...question,
			options: [...currentOpts, { id: v4(), text: '', weights: {} }],
		})

		// onChange?.({
		// 	...question,
		// 	options: [...options, { id: v4(), text: '', weights: {} }],
		// })
		const currentOptions = question.options
	}

	return (
		<Box
			p={2}
			border='1px solid #ccc'
			borderRadius={1}
			bgcolor='white'
			width='100%'
		>
			<TextField
				disabled={!isDropped}
				fullWidth
				label='Текст вопроса'
				value={question.text}
				onChange={e => onChange?.({ ...question, text: e.target.value })}
				size='small'
				sx={{ mb: 2 }}
			/>

			{question.type === 'single_choice' ? (
				<Box
					marginBottom={'10px'}
					boxShadow={'4px 4px 8px 0px rgba(34, 60, 80, 0.2)'}
				>
					<SingleChoice
						question={question}
						onChange={onChange}
						scales={scales || []}
						isDropped={isDropped || false}
						data={
							question.options || [
								{ id: v4().split('-')[1], text: '', weights: {} },
							]
						}
					/>
				</Box>
			) : (
				<Box
					boxShadow={'4px 4px 8px 0px rgba(34, 60, 80, 0.2)'}
					marginBottom={'10px'}
				>
					<MultipleCheckbox
						scales={scales || []}
						isDropped={isDropped || false}
						data={
							question.options || [
								{ id: v4().split('-')[1], text: '', weights: {} },
							]
						}
					/>
				</Box>
			)}
			<Button
				onClick={e => {
					e.stopPropagation()
					handleAddOption(question.options)
				}}
				disabled={!isDropped}
				variant='contained'
				sx={{ width: '10px', height: '60px', borderRadius: '100%' }}
			>
				<Typography variant='h4'>+</Typography>
			</Button>
		</Box>
	)
}
