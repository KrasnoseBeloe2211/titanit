import { IScale, Option } from '@/entities/test'
import { ArrowDropDown } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Checkbox,
	FormControlLabel,
	TextField,
} from '@mui/material'

export const MultipleCheckbox = ({
	data,
	isDropped,
	scales,
}: {
	data: Option[]
	scales: IScale[]
	isDropped: boolean
}) => {
	return (
		<Box>
			{data.map((opt: Option) => (
				<Box key={opt.id}>
					<FormControlLabel
						control={<Checkbox disabled={!isDropped} />}
						label={
							<TextField size='small' disabled={!isDropped} label='Ответ' />
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
									disabled={!isDropped}
									key={scale.id}
									type='number'
								/>
							))}
						</AccordionDetails>
					</Accordion>
				</Box>
			))}
		</Box>
	)
}
