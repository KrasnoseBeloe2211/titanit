'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/entities/user/model/store'

export function UserStoreInitializer() {
	const { initialize } = useUserStore()

	useEffect(() => {
		initialize()
	}, [])

	return null
}
