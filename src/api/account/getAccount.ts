import api from '@/utils/api';

export const getUserById = async (userId: string): Promise<any> => {
	try {
		const response = await api.get<{ status: string }>(`v1/users/${userId}`);

		return response.data;
	} catch (error: unknown) {
		console.error('Error fetching the user by ID:', (error as Error).message);
		throw error;
	}
};
