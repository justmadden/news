import queryString from 'query-string';

export const request = (url, params = {}, method = 'GET') => {
	const query = Object.keys(params).length
		? `?${queryString.stringify(params)}`
		: '';

	return fetch(
		`https://newsapi.org/${process.env.API_VERSION}/${url}/${query}`,
		{
			method,
			headers : {
				'X-Api-Key' : process.env.API_KEY
			}
		}
	).then(res => {
		return res.json();
	});
};
