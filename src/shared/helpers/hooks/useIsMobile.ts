import React from 'react'

export const useIsMobile = () => {
	const isMobile = window.innerWidth <= 678

	return { isMobile }
}
