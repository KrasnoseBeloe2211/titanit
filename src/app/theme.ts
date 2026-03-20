'use client'

import { blue, teal } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const Theme = createTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: blue[700],
					light: blue[500],
					dark: blue[900],
				},
				secondary: {
					main: teal[500],
					light: teal[300],
					dark: teal[700],
				},
			},
		},
	},
})
