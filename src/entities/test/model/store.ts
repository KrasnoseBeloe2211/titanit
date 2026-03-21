import { Test } from "./types"
import { create } from 'zustand'
import { getTests } from './api'

interface ITestsStore {
	tests: Test[];
	loading: boolean;
	error: string | null;

	loadTests: (psychologistId: string) => Promise<void>
	setTests: (tests: Test[]) => void
	addTest: (test: Test) => void
	updateTest: (id: string, updatedTest: Partial<Test>) => void
	deleteTest: (id: string) => void
}

<<<<<<< HEAD
export const TestsStore = create<ITestsStore>((set, get) => ({
=======
export const TestsStore = create<ITestsStore>((set) => ({
>>>>>>> 0bcce2e8e1f26da3f59ac514b3b352eaf824a25c
	tests: [],
	loading: false,
	error: null,

<<<<<<< HEAD
	loadTests: async (psychologistId: string) => {
		set({ loading: true, error: null })
		await getTests(psychologistId)
		set({ loading: false })
	},

	setTests: tests => set({ tests }),
=======
	setTests: (tests) => set({ tests }),
>>>>>>> 0bcce2e8e1f26da3f59ac514b3b352eaf824a25c

	addTest: (test) => set((state) => ({
		tests: [...state.tests, test]
	})),

	updateTest: (id, updatedTest) => set((state) => ({
		tests: state.tests.map((test) =>
			test.id === id ? { ...test, ...updatedTest } : test
		)
	})),

<<<<<<< HEAD
	deleteTest: id =>
		set(state => ({
			tests: state.tests.filter(test => test.id !== id),
		})),
}))

export const useTests = () => {
	const { tests, loading, error } = TestsStore()
	return { tests, loading, error }
}
=======
	deleteTest: (id) => set((state) => ({
		tests: state.tests.filter((test) => test.id !== id)
	})),
}));
>>>>>>> 0bcce2e8e1f26da3f59ac514b3b352eaf824a25c
