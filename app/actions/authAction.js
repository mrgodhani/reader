const {
	REGISTER,
	LOGIN,
	LOGOUT,
	TOKEN_SUCCESS,
	TOKEN_FAILURE,
	DELETE_TOKEN_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
	ON_AUTH_FORM_FIELD_CHANGE,
	LOGOUT_FAILURE
} = require('../constants').default;

import _ from 'lodash';
import AppToken from '../AppToken';
import {Actions, ActionConst} from 'react-native-router-flux';
import BackendFactory from '../BackendFactory';

export function registerState() {
	return {
		type: REGISTER
	};
}

export function loginState() {
	return {
		type: LOGIN
	};
}

export function loginFailure(error) {
	return {
		type: LOGIN_FAILURE,
		payload: error
	}
}

export function tokenRequestSuccess(token) {
	return {
		type: TOKEN_SUCCESS,
		payload: token
	}
}

export function tokenRequestFailure(error) {
	return {
		type: TOKEN_FAILURE,
		payload: _.isUndefined(error) ? null : error
	}
}

export function onAuthFormFieldChange(field, value) {
	return {
		type: ON_AUTH_FORM_FIELD_CHANGE,
		payload: {field: field, value: value}
	}
}

export function signupSuccess(json) {
	return {
		type: SIGNUP_SUCCESS,
		payload: json
	}
}

export function signupFailure(error) {
	return {
		type: SIGNUP_FAILURE,
		payload: error
	}
}

export function saveToken(token) {
  return new AppToken().storeToken(token);
}

// Login

export function login(email, password) {
	return dispatch => {
		return BackendFactory().login({
			email: email,
			password: password
		})
		.then((json) => {
			return saveToken(json.data.token)
			.then(() => {
				Actions.drawer();
			})
		})
		.catch(( error) => {
      if(!_.isUndefined(error.response.data.msg)) {
        dispatch(loginFailure(error.response.data.msg));
      } else {
        dispatch(loginFailure('Oops! Something went wrong.'));
      }
		})
	}
}


// Get Token

export function getToken() {
	return dispatch => {
		return new AppToken().getToken()
		.then((token) => {
			if(token) {
				Actions.drawer({type: ActionConst.RESET});
			} else {
				dispatch(tokenRequestFailure());
				Actions.MainPage({type: ActionConst.RESET});
			}
		})
		.catch((error) => {
			dispatch(tokenRequestFailure(error));
			dispatch(loginState());
			Actions.MainPage({type: ActionConst.RESET});
		})
	}
}
