import { combineReducers } from 'redux';
import news from '../ducks/news';

const mainReducer = combineReducers({
	news
});

export default mainReducer;
