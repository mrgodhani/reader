const {Record} = require('immutable');
const {
	LOGIN
} = require('../constants').default;

const Form = Record({
	state: LOGIN,
	disabled: false,
	error: null,
	isValid: false,
	isFetching: false,
	fields: new (Record({
		name: '',
		nameHasError: false,
		email: '',
		emailHasError: false,
		password: '',
		passwordHasError: false,
		showPassword: false
	}))
})

var InitialState = Record({
	form: new Form
})

export default InitialState;
