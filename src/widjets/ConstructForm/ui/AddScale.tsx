import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	TextField,
	Typography,
} from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'

export const AddScale = () => {
	return (
		<Box>
			<Box
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'start'}
				flexWrap={'wrap'}
			>
				<Typography variant='h4'>Создание метрик</Typography>
				<TextField label='Название метрики' />
				<TextField type='number' label='Макс. балл' />
				<Accordion>
					<AccordionSummary expandIcon={<ArrowDropDown />}>
						<Typography variant='h5'>
							Разбивка уровней заинтересованности
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box
							display={'flex'}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<Typography variant='h6'>Низкий</Typography>
							<TextField type='number' label='От' />
							-
							<TextField type='number' label='До' />
						</Box>
						<Box
							display={'flex'}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<Typography variant='h6'>Средний</Typography>
							<TextField type='number' label='От' />
							-
							<TextField type='number' label='До' />
						</Box>
						<Box
							display={'flex'}
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<Typography variant='h6'>Высокий</Typography>
							<TextField type='number' label='От' />
							-
							<TextField type='number' label='До' />
						</Box>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Box>
	)
}
