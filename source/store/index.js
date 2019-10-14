import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import mainReducer from './reducer';

export const initStore = initialState => {
	const withDevTools =
		process.env.NODE_ENV !== 'production'
			? composeWithDevTools(applyMiddleware(ReduxThunk))
			: applyMiddleware(ReduxThunk);
	return createStore(mainReducer, initialState, withDevTools);
};
