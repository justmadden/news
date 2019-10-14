import { request } from '../helpers/request';
import { uniqBy } from 'lodash-es';

const GET_ARTICLES = 'GET_ARTICLES';
const GET_MORE_ARTICLES = 'GET_MORE_ARTICLES';
const GET_SOURCES = 'GET_SOURCES';

const initialState = {
	articles      : [],
	articlesCount : 0,
	articlesPage  : 1,
	sources       : []
};

const news = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_ARTICLES:
			return {
				...state,
				articles      : payload.articles,
				articlesCount : payload.count,
				articlesPage  : 2
			};
		case GET_MORE_ARTICLES: {
			const articles = uniqBy(
				[...state.articles, ...payload.articles],
				'url'
			);
			return {
				...state,
				articles,
				articlesCount : payload.count,
				articlesPage  : state.articlesPage + 1
			};
		}
		case GET_SOURCES:
			return { ...state, sources: payload };
		default:
			return state;
	}
};

export const fetchArticles = (
	params = { sources: 'abc-news' }
) => async dispatch => {
	request('everything', {
		...params,
		pageSize : process.env.PER_PAGE,
		page     : 1
	})
		.then(res => {
			if (res.status === 'ok') {
				dispatch({
					type    : GET_ARTICLES,
					payload : { articles: res.articles, count: res.totalResults }
				});
			} else {
				throw res;
			}
		})
		.catch(error => {
			console.log(error);
		});
};
export const fetchMoreArticles = (
	params = { sources: 'abc-news' }
) => async dispatch => {
	request('everything', {
		...params,
		pageSize : process.env.PER_PAGE
	})
		.then(res => {
			if (res.status === 'ok') {
				dispatch({
					type    : GET_MORE_ARTICLES,
					payload : { articles: res.articles, count: res.totalResults }
				});
			} else {
				throw res;
			}
		})
		.catch(error => {
			console.log(error);
		});
};
export const fetchSources = (params = {}) => async dispatch => {
	request('sources', params)
		.then(res => {
			if (res.status === 'ok') {
				dispatch({
					type    : GET_SOURCES,
					payload : res.sources
				});
			} else {
				throw res;
			}
		})
		.catch(error => {
			console.log(error);
		});
};
export default news;
