import {Record} from 'immutable';

var InitialState = Record({
	currentUser: null,
	showState: false,
	currentState: null,
	online: true,
	store: null
})

export default InitialState
