/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const getMovieSlug = async (slug: string): Promise<any> => {
	try {
		const response = await axios.get(`https://phimapi.com/phim/${slug}`);
		return response.data;
	} catch (error: any) {
		console.error('Error fetching movie details:', error.response?.data || error.message);
		throw error;
	}
};
