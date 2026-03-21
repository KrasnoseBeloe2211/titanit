'use client'

import { Box, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useUserStore } from '@/entities/user/model/store'
import { usePsychologistStore } from '@/entities/psychologist'
import { ProfileSidebar, QRModal, EditProfileModal } from '@/widjets/ProfileSidebar'
import { TestsGrid } from '@/widjets/TestsGrid'

export default function ProfilePage() {
	const { user, isAuthed } = useUserStore()
	const { profile, loadProfile, loading } = usePsychologistStore()

	useEffect(() => {
		if (user?.sub) {
			loadProfile(user.sub)
		}
	}, [user?.sub])

	if (!isAuthed) {
		return (
			<Box
				sx={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography color="#6b7280">Загрузка...</Typography>
			</Box>
		)
	}

	return (
		<>
			<QRModal />
			<EditProfileModal />

			<Box
				sx={{
					minHeight: '100vh',
					background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
					padding: '40px 20px',
				}}
			>
				<Typography
					variant="h4"
					sx={{
						fontWeight: 700,
						color: '#ffffff',
						marginBottom: '40px',
						textAlign: 'center',
					}}
				>
					Личный кабинет психолога
				</Typography>

				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 4 }}>
						<ProfileSidebar profile={profile} loading={loading} />
					</Grid>

					<Grid size={{ xs: 12, md: 8 }}>
						<Box
							sx={{
								background: 'rgba(20, 20, 20, 0.6)',
								backdropFilter: 'blur(20px)',
								border: '1px solid rgba(255, 255, 255, 0.08)',
								borderRadius: '24px',
								padding: '30px',
							}}
						>
							<Typography
								variant="h6"
								sx={{
									color: '#ffffff',
									fontWeight: 600,
									marginBottom: '24px',
								}}
							>
								Мои тесты
							</Typography>
							<TestsGrid />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}
