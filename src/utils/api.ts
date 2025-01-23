import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5000/',
	// baseURL: 'https://be-boilerplate.onrender.com/',
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

// api.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;

// 		originalRequest._retry = true;
// 		const refreshToken = localStorage.getItem('refreshToken');
// 		try {
// 			const response = await api.post('v1/auth/refresh-tokens', { token: refreshToken });
// 			const { accessToken } = response.data;
// 			localStorage.setItem('accessToken', accessToken);
// 			originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
// 			return api(originalRequest);
// 		} catch {
// 			localStorage.removeItem('accessToken');
// 			localStorage.removeItem('refreshToken');
// 			// window.location.href = '/login';
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default api;
