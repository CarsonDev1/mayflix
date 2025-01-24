import axios from 'axios';

const apiToken = axios.create({
	baseURL: 'http://localhost:5000/',
	// baseURL: 'https://be-boilerplate.onrender.com/',
	headers: {
		'Content-Type': 'application/json',
	},
});

apiToken.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	console.log('Token in request:', token);
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

apiToken.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			const refreshToken = localStorage.getItem('refreshToken');

			try {
				const response = await apiToken.post('v1/auth/refresh-tokens', { refreshToken: refreshToken });

				const accessToken = response.data?.access?.token;
				localStorage.setItem('accessToken', accessToken);
				return apiToken(originalRequest);
			} catch (refreshError) {
				console.error('Refresh token failed:', refreshError);
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

export default apiToken;
