import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from 'utils/cookie';

export const useDataApi = (initialUrl, initialquery = {}) => {
	const [data, setData] = useState([]);
	const [meta, setMeta] = useState(null);
	const [url, setUrl] = useState(initialUrl || 'http://172.104.163.254:8000/api/v1/machines/data');
	const [query, setQuery] = useState(initialquery);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		console.log('query in hooks',query);
		const token = getCookie('mctoken', null);

		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios.get(url, {
					headers: {
						authorization: 'jwt ' + token
					},
					params: query
				});
				// setData(result?.data);
				console.log('result', result);
				result?.data?.data && setData(result?.data?.data);
				result?.data?.meta_data && setMeta(result?.data?.meta_data);

			} catch (error) {
				setIsError(true);
				setError(error?.response?.data?.Message)
			}

			setIsLoading(false);
		};

		fetchData();
	}, [query]);

	return [{ data,meta, isLoading, isError, error }, setQuery];
};