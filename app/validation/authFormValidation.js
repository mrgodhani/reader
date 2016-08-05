const {
	LOGOUT,
	REGISTER,
	LOGIN
} = require('../constants').default;

export default function formValidation(state) {
	switch(state.form.state) {
		case LOGOUT:
		case REGISTER:
			if ((state.form.fields.name !== '' && state.form.fields.email !== '' && state.form.fields.password !== '') && (!state.form.fields.nameHasError && !state.form.fields.emailHasError && !state.form.fields.passwordHasError)) {
				return state.setIn(['form','isValid'],true);
			}
			break;
		case LOGIN:
			if(state.form.fields.email !== '' && state.form.fields.password !== '')
			{
				return state.setIn(['form','isValid'],true);
			}
			else {
				return state.setIn(['form','isValid'],false);
			}
			break;
		default:
			return state;
	}
}
