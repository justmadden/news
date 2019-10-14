import React from 'react';
import Main from './pages';
import { Provider } from 'react-redux';
import { initStore } from './store';
import { BrowserRouter } from 'react-router-dom';

const store = initStore();

export default () => {
	return (
		<div>
			<Provider store={store}>
				<BrowserRouter>
					<Main />
				</BrowserRouter>
			</Provider>
		</div>
	);
};
