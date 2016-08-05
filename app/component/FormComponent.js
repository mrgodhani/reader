import React, { Component, PropTypes } from 'react';
const {
	REGISTER,
	LOGIN
} = require('../constants').default;
import {
	StyleSheet
} from 'react-native';
import t from 'tcomb-form-native';
import _ from 'lodash';

let Form = t.form.Form;

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.fontFamily = 'OpenSans';

export default class FormComponent extends Component {
	static PropTypes = {
		formType: PropTypes.string,
		form: PropTypes.object,
		value: PropTypes.object,
		onChange: PropTypes.func
	}

	render() {
		let formType = this.props.formType;

		let options = {
			auto: 'placeholders',
			fields: {}
		}

		let secureTextEntry = !this.props.form.fields.showPassword;

		let name = {
			label: 'Name',
			editable: !this.props.form.isFetching,
			hasError: this.props.form.fields.nameHasError,
			error: 'Name is required',
      stylesheet: stylesheet
		};

    let email = {
      label: 'Email',
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: 'Please enter valid Email'
    };

		let password = {
			label: 'Password',
			maxLength: 32,
			secureTextEntry: secureTextEntry,
			editable: !this.props.form.isFetching,
			hasError: this.props.form.fields.passwordHasError,
			error: 'Must have 6 - 12 characters with at least 1 number and 1 special character'
		};

		let passwordWithoutValid = {
			label: 'Password',
			maxLength: 32,
			secureTextEntry: secureTextEntry
		};

		let loginForm;

		switch(formType) {
			case(REGISTER):
				loginForm = t.struct({
					name: t.String,
					email: t.String,
					password: t.String
				});
				options.fields['name'] = name;
				options.fields['email'] = email;
				options.fields['password'] = password;
				break;
			case(LOGIN):
				loginForm = t.struct({
					email: t.String,
					password: t.String
				});
				options.fields['email'] = email;
				options.fields['password'] = passwordWithoutValid;
				break;
		}

		return (
			<Form ref="form"
					type={loginForm}
					options={options}
					value={this.props.value}
					onChange={this.props.onChange}
			/>
		)
	}
}
