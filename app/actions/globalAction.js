const {
	SET_STATE,
	SET_STORE,
	SET_TOKEN,
	GET_STATE,
  CONNECTION_ONLINE,
  CONNECTION_OFFLINE
} = require('../constants').default;


export function setToken(token) {
	return {
		type: SET_TOKEN,
		payload: token
	}
}

export function setStore(store) {
	return {
		type: SET_STORE,
		payload: store
	}
}

export function setState(newState) {
	return {
		type: SET_STATE,
		payload: newState
	}
}

export function getState(toggle) {
	return {
		type: GET_STATE,
		payload: toggle
	}
}

export function goOnline() {
  return {
    type: CONNECTION_ONLINE
  }
}

export function goOffline() {
  return {
    type: CONNECTION_OFFLINE
  }
}


export function checkConnection(reach) {
  return dispatch => {
    if(reach === 'wifi' || reach === 'cell') {
      dispatch(goOnline());
    } else {
      dispatch(goOffline());
    }
  }
}
