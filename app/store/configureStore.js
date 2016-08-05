import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import devTools from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from '../reducers';
import createCompressor from 'redux-persist-transform-compress'

export default function configureStore(initialState,onComplete) {
	const enhancer = compose(
		autoRehydrate(),
		applyMiddleware(thunk),
		devTools()
	);
	const store = createStore(reducer,initialState,enhancer);
	const persistor = persistStore(store, {storage: AsyncStorage}, onComplete);
	return store;
}
