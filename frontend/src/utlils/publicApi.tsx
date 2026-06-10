import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_ENDPOINT,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject<string>(Error(error?.response?.data?.message));
	},
);
