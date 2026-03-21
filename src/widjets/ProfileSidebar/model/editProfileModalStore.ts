import { create } from 'zustand'

interface EditProfileModalStore {
	isOpen: boolean
	openEditProfile: () => void
	closeEditProfile: () => void
}

export const useEditProfileModalStore = create<EditProfileModalStore>((set) => ({
	isOpen: false,
	openEditProfile: () => set({ isOpen: true }),
	closeEditProfile: () => set({ isOpen: false }),
}))
