// import axios from 'axios';
// import { TestsStore } from './store';
// import { Test } from './types';
// import { apiController } from '@/shared/config/api/api';

// const baseUrl = 'http://26.142.149.241:8080';

// const api = axios.create({
//     baseURL: baseUrl,
//     withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export const fetchTests = async (psychologistId: string) => {
//     try {
//         const response = await api.get(`/tests?psychologist_id=${psychologistId}`);
//         TestsStore.getState().setTests(response.data);
//     } catch (error) {
//         console.error('Ошибка загрузки:', error);
//     }
// };

// export const deleteTest = async (id: string) => {
//     try {
//         await api.delete(`/tests/${id}`);
//         TestsStore.getState().deleteTest(id);
//     } catch (error) {
//         console.error('Ошибка удаления:', error);
//     }
// };

// export const createTest = async (testData: Omit<Test, 'id'>) => {
//     try {
//         const response = await api.post('/tests', testData);
//         TestsStore.getState().addTest(response.data);
//     } catch (error) {
//         console.error('Ошибка создания:', error);
//     }
// };

// export const updateTest = async (id: string, data: Partial<Test>) => {
//     try {
//         const response = await api.put(`/tests/${id}`, data);
//         TestsStore.getState().updateTest(id, response.data);
//     } catch (error) {
//         console.error('Ошибка обновления:', error);
//     }
// };
// export const getTests = async () => {
//     const response = await apiController('GET', '/endpoint')
// }

import { TestsStore } from './store';
import { Test } from './types';
import { apiController } from '@/shared/config/api/api';

export const getTests = async (psychologistId: string) => {
    try {
        const response = await apiController<Test[]>('GET', `/tests?psychologist_id=${psychologistId}`);
        TestsStore.getState().setTests(response.data);
    } catch (error) {
        console.error('Ошибка загрузки тестов', error);
    }
};

export const getTestById = async (id: string) => {
    try {
        const response = await apiController<Test>('GET', `/tests/${id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка загрузки теста', error);
        return null;
    }
};

export const createTest = async (testData: Omit<Test, 'id'>) => {
    try {
        const response = await apiController<Test>('POST', '/tests', testData);
        TestsStore.getState().addTest(response.data);
    } catch (error) {
        console.error('Ошибка создания', error);
    }
};

export const updateTest = async (id: string, data: Partial<Test>) => {
    try {
        const response = await apiController<Test>('PATCH', `/tests/${id}`, data);
        TestsStore.getState().updateTest(id, response.data);
    } catch (error) {
        console.error('Ошибка обновления', error);
    }
};