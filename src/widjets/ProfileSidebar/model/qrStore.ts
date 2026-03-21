import { create } from 'zustand'

interface QRModalStore {
	isOpen: boolean
	openQR: () => void
	closeQR: () => void
}

export const useQRModalStore = create<QRModalStore>((set) => ({
	isOpen: false,
	openQR: () => set({ isOpen: true }),
	closeQR: () => set({ isOpen: false }),
}))
