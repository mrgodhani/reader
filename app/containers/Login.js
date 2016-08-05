import React, {PropTypes,Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as authActions from '../actions/authAction';
import {Actions} from 'react-native-router-flux';
import FormRender from '../component/FormRender';
import {StatusBar} from 'react-native';

const {
  LOGIN,
  REGISTER
} = require('../constants').default;

const actions = [
  authActions
]

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
  .merge(...actions)
  .filter(value => typeof value === 'function')
  .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  }
}

class Login extends Component {

  componentDidMount = () => {
    StatusBar.setBarStyle('default');
  }

	buttonPressHandler = () => {
		this.props.actions.login(this.props.auth.form.fields.email, this.props.auth.form.fields.password)
	}

  render() {
		let loginBtnText = 'Login';
		let onButtonPress = this.buttonPressHandler;
    let formActions = this.props.actions;

    return(
			<FormRender
				formType= { LOGIN }
        loginButtonText={ loginBtnText }
        onButtonPress={ onButtonPress }
        messageType={ REGISTER }
        auth={this.props.auth}
        formActions={formActions}
      />
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
