'use client'
import { Box, Typography } from '@mui/material'

export const LayoutUI = ({ children }: any) => {

  

	return (
		<Box
			sx={{
				minHeight: 'calc(100vh-80px)',
				display: 'flex',
				flexDirection: 'column',
				flexGrow: '100%',
				width: '100%',
			}}
		>
			<Box
				sx={theme => ({
					backgroundColor: theme.palette.primary.light,
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					height: '100px',
				})}
			>
				<Typography
					sx={theme => ({
						color: theme.palette.background.default,
						fontWeight: 'bold',
					})}
					variant='h3'
				>
					ПрофДНК
				</Typography>
			</Box>
			<Box margin={'auto'} marginY={'30px'} width={'90%'}>
				{children}
			</Box>
		</Box>
	)
}
