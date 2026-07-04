import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_ENDPOINT,
	withCredentials: true, // to receive cookies
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error?.response?.data?.message);
		return Promise.reject<string>(Error(error?.response?.data?.message));
	},
);
