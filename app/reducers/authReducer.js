const {
	LOGIN,
	REGISTER,
	ON_AUTH_FORM_FIELD_CHANGE,
	SET_STATE,
	LOGIN_FAILURE,
	SIGNUP_FAILURE
} = require('../constants').default;

const formValidation = require('../validation/authFormValidation').default;
const fieldValidation = require('../fieldValidation').default;
const InitialState = require('../states/authInitialState').default;
const iState = new InitialState

export default function authReducer(state = iState, action) {
	switch(action.type) {
		case LOGIN:
				return state.setIn(['form','error'],null)
				.setIn(['form','isValid'],false)
				.setIn(['form','disabled'],false)
				.setIn(['form','isFetching'],false)
				.setIn(['form','fields','email'],null)
				.setIn(['form','fields','password'],null)
				.setIn(['form','fields','emailHasError'], false)
				.setIn(['form','fields','passwordHasError'], false)
		case REGISTER:
				return state.setIn(['form','error'],null)
				.setIn(['form','isValid'],false)
				.setIn(['form','isFetching'],false)
				.setIn(['form','disabled'],false)
				.setIn(['form','fields','email'],null)
				.setIn(['form','fields','name'],null)
				.setIn(['form','fields','password'],null)
				.setIn(['form','fields','emailHasError'],false)
				.setIn(['form','fields','passwordHasError'],false)
		case SIGNUP_FAILURE:
				return state.setIn(['form','isFetching'], false)
				.setIn(['form','error'],action.payload)
		case LOGIN_FAILURE:
				return state.setIn(['form','isFetching'], false)
				.setIn(['form','error'],action.payload)
		case ON_AUTH_FORM_FIELD_CHANGE:
				const {field, value} = action.payload;
				let nextState = state.setIn(['form','fields',field], value).setIn(['form','error'],null);
				let finalState = formValidation(fieldValidation(nextState, action), action);
				return finalState;
		case SET_STATE:
				var form = JSON.parse(action.payload).auth.form;
				var next = state.setIn(['form','state'], form.state)
				.setIn(['form','disabled'], form.disabled)
				.setIn(['form','error'], form.error)
				.setIn(['form','isValid'], form.isValid)
				.setIn(['form','isFetching'], form.isFetching)
				.setIn(['form','fields','name'],form.fields.name)
				.setIn(['form','fields','nameHasError'], form.fields.nameHasError)
				.setIn(['form','fields','email'], form.fields.email)
				.setIn(['form','fields','emailHasError'],form.fields.emailHasError)
				.setIn(['form','fields','password',form.fields.password])
				.setIn(['form','fields','passwordHasError'],form.fields.passwordHasError)
				return next;
		default:
				return state;
	}
}
