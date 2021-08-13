import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie,deleteAllCookie } from 'utils/cookie';
import { useRouter } from 'next/router';

export const useDataApi = (initialUrl, initialquery = {}) => {
	const [data, setData] = useState([]);
	const [meta, setMeta] = useState(null);
	const [url, setUrl] = useState(initialUrl);
	const [query, setQuery] = useState(initialquery);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState('');

	const router = useRouter();
	const host = process.env.NEXT_PUBLIC_HOST;

	useEffect(() => {
		const token = getCookie('mctoken', null);

		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios.get(`${host}/${url}`, {
					headers: {
						authorization: 'jwt ' + token
					},
					params: query
				});
				result?.data?.data && setData(result?.data?.data);
				result?.data?.meta_data && setMeta(result?.data?.meta_data);

			} catch (error) {
				setIsError(true);
				setError(error?.response?.data?.message);
				
				if(error?.response?.status==403){
					deleteAllCookie();
					router.push('/login');
				}
				
			}

			setIsLoading(false);
		};

		fetchData();
	}, [query]);

	return [{ data,meta, isLoading, isError, error }, setQuery];
};