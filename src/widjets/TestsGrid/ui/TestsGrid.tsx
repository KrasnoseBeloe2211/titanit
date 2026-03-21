'use client'

import { Box, Typography, Card, CardContent, IconButton, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BarChartIcon from '@mui/icons-material/BarChart'
import { TestsStore, useTests } from '@/entities/test'
import { useEffect } from 'react'
import { useUserStore } from '@/entities/user/model/store'

export const TestsGrid = () => {
	const { user } = useUserStore()
	const { tests, loading } = useTests()

	useEffect(() => {
		if (user?.sub) {
			TestsStore.getState().loadTests(user.sub)
		}
	}, [user?.sub])

	if (loading) {
		return (
			<Typography color="#6b7280" textAlign="center">
				Загрузка...
			</Typography>
		)
	}

	if (!tests || tests.length === 0) {
		return (
			<Card
				sx={{
					background: 'rgba(20, 20, 20, 0.6)',
					backdropFilter: 'blur(20px)',
					border: '1px solid rgba(255, 255, 255, 0.08)',
					borderRadius: '24px',
				}}
			>
				<CardContent sx={{ padding: '40px', textAlign: 'center' }}>
					<BarChartIcon
						sx={{
							fontSize: 60,
							color: '#6b7280',
							marginBottom: '16px',
						}}
					/>
					<Typography
						variant="h6"
						sx={{
							color: '#ffffff',
							marginBottom: '8px',
						}}
					>
						У вас пока нет тестов
					</Typography>
					<Typography
						sx={{
							color: '#9ca3af',
							fontSize: '14px',
						}}
					>
						Создайте свой первый тест в конструкторе
					</Typography>
				</CardContent>
			</Card>
		)
	}

	return (
		<Grid container spacing={3}>
			{tests.map((test) => (
				<Grid size={{ xs: 12, sm: 6, md: 4 }} key={test.id}>
					<Card
						sx={{
							height: '100%',
							background: 'rgba(20, 20, 20, 0.6)',
							backdropFilter: 'blur(20px)',
							border: '1px solid rgba(255, 255, 255, 0.08)',
							borderRadius: '24px',
							boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
							transition: 'all 0.3s ease',
							'&:hover': {
								borderColor: 'rgba(255, 255, 255, 0.15)',
								transform: 'translateY(-4px)',
							},
						}}
					>
						<CardContent sx={{ padding: '24px' }}>
							<Typography
								variant="h6"
								sx={{
									color: '#ffffff',
									fontWeight: 600,
									marginBottom: '12px',
									pruning: 'line-clamp',
									display: '-webkit-box',
									WebkitLineClamp: 2,
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden',
								}}
							>
								{test.title}
							</Typography>

							<Typography
								sx={{
									color: '#9ca3af',
									fontSize: '13px',
									marginBottom: '20px',
									lineHeight: 1.6,
									display: '-webkit-box',
									WebkitLineClamp: 3,
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden',
								}}
							>
								{test.description || 'Описание отсутствует'}
							</Typography>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										gap: '8px',
									}}
								>
									<IconButton
										size="small"
										sx={{
											color: '#9ca3af',
											'&:hover': {
												color: '#ffffff',
												background: 'rgba(255, 255, 255, 0.05)',
											},
										}}
									>
										<EditIcon />
									</IconButton>
									<IconButton
										size="small"
										sx={{
											color: '#9ca3af',
											'&:hover': {
												color: '#ef4444',
												background: 'rgba(239, 68, 68, 0.1)',
											},
										}}
									>
										<DeleteIcon />
									</IconButton>
								</Box>

								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: '6px',
										color: '#13a749',
										fontSize: '13px',
									}}
								>
									<BarChartIcon fontSize="small" />
									<Typography
										sx={{
											color: '#13a749',
											fontSize: '13px',
											fontWeight: 500,
										}}
									>
										{test.schema.questions?.length || 0} вопросов
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	)
}
