import axios from 'axios';

export const getAnimes = async (page: number): Promise<any> => {
	try {
		const response = await axios.get(`https://phimapi.com/v1/api/danh-sach/hoat-hinh`, {
			params: { page },
		});
		return response.data;
	} catch (error: any) {
		console.error('Error fetching movies:', error.response?.data || error.message);
		throw error;
	}
};
