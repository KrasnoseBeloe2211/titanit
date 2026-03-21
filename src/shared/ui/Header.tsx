'use client'

import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/entities/user/model/store'
import { jwtDecode } from 'jwt-decode'

export const Header = () => {
	const router = useRouter()
	const { isAuthed } = useUserStore()

	// Получаем имя пользователя из токена
	const getTokenName = () => {
		const token = localStorage.getItem('access_token')
		if (!token) return null
		try {
			const decoded: any = jwtDecode(token)
			return decoded.name || decoded.sub || null
		} catch {
			return null
		}
	}

	const userName = getTokenName()

	return (
		<AppBar
			position="fixed"
			elevation={0}
			sx={{ background: 'transparent', padding: '16px 40px' }}
		>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Typography fontWeight={600}>TITANIT</Typography>

				{isAuthed && userName ? (
					<Button
						variant="outlined"
						onClick={() => router.push('/profile')}
						sx={{
							borderRadius: '999px',
							background: 'rgba(255, 255, 255, 0.1)',
							color: '#ffffff',
							textTransform: 'none',
							border: '1px solid rgba(255, 255, 255, 0.2)',
							transition: 'all 0.3s ease',
							'&:hover': {
								background: 'rgba(255, 255, 255, 0.2)',
								borderColor: 'rgba(255, 255, 255, 0.4)',
							},
						}}
					>
						{userName}
					</Button>
				) : (
					<Button
						variant="outlined"
						onClick={() => router.push('/login')}
						sx={{
							borderRadius: '999px',
							background: '#fff',
							color: '#000',
							textTransform: 'none',
							border: '1px solid transparent',
							transition: 'all 0.3s ease',
							'&:hover': {
								background: 'transparent',
								color: '#ffffff',
								border: '1px solid #ffffff',
							},
						}}
					>
						Sign in
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}
