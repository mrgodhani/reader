const {
	SET_STATE,
	GET_STATE,
	SET_STORE,
	SET_TOKEN,
	CONNECTION_ONLINE,
	CONNECTION_OFFLINE
} = require('../constants').default;

import InitialState from '../states/globalInitialState';
const iState = new InitialState;

export default function globalReducer(state = iState,action){
	if(!(state instanceof InitialState)){
		return iState.merge(state);
	}
	switch(action.type){
		case CONNECTION_ONLINE:
			return state.set('online',true)
		case CONNECTION_OFFLINE:
			return state.set('online',false)
		default:
			return state;
	}
}
