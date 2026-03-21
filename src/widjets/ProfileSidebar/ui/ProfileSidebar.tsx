'use client'

import { Box, Typography, Avatar, Button, Card, CardContent } from '@mui/material'
import QrCodeIcon from '@mui/icons-material/QrCode'
import EditIcon from '@mui/icons-material/Edit'
import { useQRModalStore } from '../model/qrStore'
import { useEditProfileModalStore } from '../model/editProfileModalStore'
import type { Psychologist } from '@/entities/psychologist'

interface ProfileSidebarProps {
	profile: Psychologist | null
	loading?: boolean
}

export const ProfileSidebar = ({ profile, loading }: ProfileSidebarProps) => {
	const { openQR } = useQRModalStore()
	const { openEditProfile } = useEditProfileModalStore()

	if (loading) {
		return (
			<Card
				sx={{
					background: 'rgba(20, 20, 20, 0.6)',
					backdropFilter: 'blur(20px)',
					border: '1px solid rgba(255, 255, 255, 0.08)',
					borderRadius: '24px',
				}}
			>
				<CardContent sx={{ padding: '30px', textAlign: 'center' }}>
					<Typography color="#6b7280">Загрузка...</Typography>
				</CardContent>
			</Card>
		)
	}

	if (!profile) {
		return (
			<Card
				sx={{
					background: 'rgba(20, 20, 20, 0.6)',
					backdropFilter: 'blur(20px)',
					border: '1px solid rgba(255, 255, 255, 0.08)',
					borderRadius: '24px',
				}}
			>
				<CardContent sx={{ padding: '30px', textAlign: 'center' }}>
					<Typography color="#6b7280">Профиль не найден</Typography>
				</CardContent>
			</Card>
		)
	}

	return (
		<>
			<Card
				sx={{
					background: 'rgba(20, 20, 20, 0.6)',
					backdropFilter: 'blur(20px)',
					border: '1px solid rgba(255, 255, 255, 0.08)',
					borderRadius: '24px',
					boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
				}}
			>
				<CardContent sx={{ padding: '30px' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<Avatar
							src={profile.photo || undefined}
							alt={profile.name}
							sx={{
								width: 120,
								height: 120,
								marginBottom: '20px',
								border: '3px solid rgba(255, 255, 255, 0.1)',
							}}
						/>

						<Typography
							variant="h5"
							sx={{
								fontWeight: 700,
								color: '#ffffff',
								marginBottom: '8px',
							}}
						>
							{profile.name}
						</Typography>

						{profile.description && (
							<Typography
								sx={{
									color: '#9ca3af',
									fontSize: '14px',
									textAlign: 'center',
									marginBottom: '24px',
									lineHeight: 1.6,
								}}
							>
								{profile.description}
							</Typography>
						)}

						<Box
							sx={{
								display: 'flex',
								gap: '12px',
								width: '100%',
							}}
						>
							<Button
								variant="contained"
								startIcon={<QrCodeIcon />}
								onClick={openQR}
								fullWidth
								sx={{
									background: 'linear-gradient(135deg, #13a749 0%, #0d8a3a 100%)',
									color: '#ffffff',
									fontWeight: 600,
									padding: '12px 20px',
									borderRadius: '12px',
									textTransform: 'none',
									'&:hover': {
										background: 'linear-gradient(135deg, #0d8a3a 0%, #086b2d 100%)',
									},
								}}
							>
								QR-код
							</Button>

							<Button
								variant="outlined"
								startIcon={<EditIcon />}
								onClick={openEditProfile}
								fullWidth
								sx={{
									color: '#ffffff',
									borderColor: 'rgba(255, 255, 255, 0.2)',
									fontWeight: 600,
									padding: '12px 20px',
									borderRadius: '12px',
									textTransform: 'none',
									'&:hover': {
										borderColor: 'rgba(255, 255, 255, 0.4)',
										background: 'rgba(255, 255, 255, 0.05)',
									},
								}}
							>
								Редактировать
							</Button>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</>
	)
}
