import { Test } from './types'
import { create } from 'zustand'
import { getTests } from './api'

interface ITestsStore {
	tests: Test[]
	loading: boolean
	error: string | null

	loadTests: (psychologistId: string) => Promise<void>
	setTests: (tests: Test[]) => void
	addTest: (test: Test) => void
	updateTest: (id: string, updatedTest: Partial<Test>) => void
	deleteTest: (id: string) => void
}

export const TestsStore = create<ITestsStore>((set, get) => ({
	tests: [],
	loading: false,
	error: null,

	loadTests: async (psychologistId: string) => {
		set({ loading: true, error: null })
		await getTests(psychologistId)
		set({ loading: false })
	},

	setTests: tests => set({ tests }),

	addTest: test =>
		set(state => ({
			tests: [...state.tests, test],
		})),

	updateTest: (id, updatedTest) =>
		set(state => ({
			tests: state.tests.map(test =>
				test.id === id ? { ...test, ...updatedTest } : test,
			),
		})),

	deleteTest: id =>
		set(state => ({
			tests: state.tests.filter(test => test.id !== id),
		})),
}))

export const useTests = () => {
	const { tests, loading, error } = TestsStore()
	return { tests, loading, error }
}
