import { combineReducers } from 'redux';
import auth from './authReducer';
import global from './globalReducer';
import feed from './feedReducer';
import routes from './routes';
import articles from './articleReducer';

const rootReducer = combineReducers({
	auth,
	global,
	feed,
	articles,
	routes
})

export default rootReducer
