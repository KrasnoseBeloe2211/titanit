'use client'

import { Dialog, DialogContent, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useQRModalStore } from '../model/qrStore'
import { useEffect, useState } from 'react'

export const QRModal = () => {
	const { isOpen, closeQR } = useQRModalStore()
	const [qrCodeUrl, setQrCodeUrl] = useState('')

	useEffect(() => {
		// Генерируем QR-код через API (используем публичный сервис)
		// В реальности здесь будет ссылка на профиль психолога
		const profileUrl = `${window.location.origin}/report/client`
		setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(profileUrl)}`)
	}, [])

	return (
		<Dialog
			open={isOpen}
			onClose={closeQR}
			PaperProps={{
				sx: {
					background: 'rgba(20, 20, 20, 0.95)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
					borderRadius: '24px',
				},
			}}
		>
			<DialogContent sx={{ padding: '40px' }}>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '20px' }}>
						<IconButton onClick={closeQR} sx={{ color: '#9ca3af' }}>
							<CloseIcon />
						</IconButton>
					</Box>

					<Typography
						variant="h5"
						sx={{
							fontWeight: 700,
							color: '#ffffff',
							marginBottom: '8px',
						}}
					>
						QR-код для клиентов
					</Typography>

					<Typography
						sx={{
							color: '#9ca3af',
							fontSize: '14px',
							marginBottom: '30px',
							textAlign: 'center',
						}}
					>
						Клиенты могут отсканировать этот код<br />для доступа к вашим тестам
					</Typography>

					<Box
						sx={{
							background: '#ffffff',
							padding: '20px',
							borderRadius: '16px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{qrCodeUrl && (
							<img
								src={qrCodeUrl}
								alt="QR Code"
								style={{ width: '250px', height: '250px' }}
							/>
						)}
					</Box>
				</Box>
			</DialogContent>
		</Dialog>
	)
}
