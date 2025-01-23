import api from '@/utils/api';
import apiToken from '@/utils/apiToken';

export const getUserById = async (userId: string): Promise<any> => {
	try {
		const response = await apiToken.get<{ status: string }>(`v1/users/${userId}`);

		return response.data;
	} catch (error: unknown) {
		console.error('Error fetching the user by ID:', (error as Error).message);
		throw error;
	}
};
