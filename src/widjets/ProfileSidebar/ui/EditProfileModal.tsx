'use client'

import { Dialog, DialogContent, Box, Typography, IconButton, TextField, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEditProfileModalStore } from '../model/editProfileModalStore'
import { usePsychologistStore } from '@/entities/psychologist'
import { useState } from 'react'
import { useUserStore } from '@/entities/user/model/store'

export const EditProfileModal = () => {
	const { isOpen, closeEditProfile } = useEditProfileModalStore()
	const { profile, updateProfile } = usePsychologistStore()
	const { user } = useUserStore()
	
	const [formData, setFormData] = useState({
		name: '',
		photo: '',
		description: '',
	})

	// Заполняем форму текущими данными при открытии
	if (profile && formData.name === '') {
		setFormData({
			name: profile.name || '',
			photo: profile.photo || '',
			description: profile.description || '',
		})
	}

	const handleSubmit = async () => {
		if (!user?.sub) return

		await updateProfile(user.sub, {
			name: formData.name,
			photo: formData.photo || undefined,
			description: formData.description || undefined,
		})
		closeEditProfile()
	}

	return (
		<Dialog
			open={isOpen}
			onClose={closeEditProfile}
			PaperProps={{
				sx: {
					background: 'rgba(20, 20, 20, 0.95)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					borderRadius: '24px',
					minWidth: '500px',
				},
			}}
		>
			<DialogContent sx={{ padding: '40px' }}>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
					<IconButton onClick={closeEditProfile} sx={{ color: '#9ca3af' }}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Typography
					variant="h5"
					sx={{
						fontWeight: 700,
						color: '#ffffff',
						marginBottom: '30px',
					}}
				>
					Редактировать профиль
				</Typography>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
					<Box>
						<Typography
							sx={{
								color: '#9ca3af',
								fontSize: '13px',
								marginBottom: '8px',
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
							}}
						>
							ФИО
						</Typography>
						<TextField
							fullWidth
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							InputProps={{
								sx: {
									color: '#ffffff',
									'& .MuiOutlinedInput-notchedOutline': {
										borderColor: 'rgba(255, 255, 255, 0.2)',
									},
									'&:hover .MuiOutlinedInput-notchedOutline': {
										borderColor: 'rgba(255, 255, 255, 0.3)',
									},
									'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
										borderColor: '#13a749',
									},
								},
							}}
						/>
					</Box>

					<Box>
						<Typography
							sx={{
								color: '#9ca3af',
								fontSize: '13px',
								marginBottom: '8px',
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
							}}
						>
							Ссылка на фото
						</Typography>
						<TextField
							fullWidth
							value={formData.photo}
							onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
							placeholder="https://example.com/photo.jpg"
							InputProps={{
								sx: {
									color: '#ffffff',
									'& .MuiOutlinedInput-notchedOutline': {
										borderColor: 'rgba(255, 255, 255, 0.2)',
									},
									'&:hover .MuiOutlinedInput-notchedOutline': {
										borderColor: 'rgba(255, 255, 255, 0.3)',
									},
									'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
										borderColor: '#13a749',
									},
								},
							}}
						/>
					</Box>

					<Box>
						<Typography
							sx={{
								color: '#9ca3af',
								fontSize: '13px',
								marginBottom: '8px',
								textTransform: 'uppercase',
								letterSpacing: '0.5px',
							}}
						>
							О себе
						</Typography>
						<TextField
							fullWidth
							multiline
							rows={4}
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							placeholder="Краткое описание вашей деятельности..."
							InputProps={{
								sx: {
									color: '#ffffff',
									'& .MuiOutlinedInput-notchedOutline': {
										borderColor: 'rgba(255, 255, 255, 0.2)',
									},
									'&:hover .MuiOutlinedInput-notchedOutline': {
										borderColor: 'rgba(255, 255, 255, 0.3)',
									},
									'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
										borderColor: '#13a749',
									},
								},
							}}
						/>
					</Box>

					<Button
						variant="contained"
						onClick={handleSubmit}
						fullWidth
						sx={{
							background: 'linear-gradient(135deg, #13a749 0%, #0d8a3a 100%)',
							color: '#ffffff',
							fontWeight: 600,
							padding: '14px 20px',
							borderRadius: '12px',
							textTransform: 'none',
							marginTop: '10px',
							'&:hover': {
								background: 'linear-gradient(135deg, #0d8a3a 0%, #086b2d 100%)',
							},
						}}
					>
						Сохранить изменения
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	)
}
