import React, { Component } from 'react';
import FormComponent from './FormComponent';
import FormButton from './FormButton';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import ErrorAlert from './ErrorAlert';
var {height, width} = Dimensions.get('window');
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View
}
from 'react-native';

const {
  LOGIN,
  REGISTER
} = require('../constants').default;

var styles = StyleSheet.create({
  container: {
		padding: 20,
    backgroundColor: 'white',
    marginTop: 100
  },
  pageTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: '#3023AE',
		textAlign: 'center',
		marginBottom: 20
  },
  formText: {
    fontFamily: 'OpenSans',
    marginTop: 10,
    fontSize: 15,
		textAlign: 'center'
  }
})

export default class FormRender extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
  }

  state = {
    value: {
      name: this.props.auth.form.fields.name,
      email: this.props.auth.form.fields.email,
      password: this.props.auth.form.fields.password
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      value: {
        name: nextProps.auth.form.fields.name,
        email: nextProps.auth.form.fields.email,
        password: nextProps.auth.form.fields.password
      }
    })
  }

  onChange = (value) => {
    if(value.name !== '') {
      this.props.formActions.onAuthFormFieldChange('name', value.name);
    }
    if(value.email !== '') {
      this.props.formActions.onAuthFormFieldChange('email', value.email);
    }
    if(value.password !== '') {
      this.props.formActions.onAuthFormFieldChange('password', value.password);
    }
  }


  getMessage = (messageType, actions) => {
    switch(messageType) {
      case LOGIN:
        return (
          <TouchableHighlight
            underlayColor='#fff'
            onPress={() => {
              actions.loginState();
              Actions.Login();
            }} >
            <Text style={styles.formText}>Already have an account ?</Text>
          </TouchableHighlight>
        )
      case REGISTER:
        return (
          <TouchableHighlight
            underlayColor='#fff'
            onPress={() => {
              actions.registerState();
              Actions.Register();
            }}>
            <Text style={styles.formText}>New user? Register</Text>
          </TouchableHighlight>
        )
    }
  }

  getPageTitle = (messageType) => {
    switch(messageType) {
      case LOGIN:
        return (
          <Text style={styles.pageTitle}>
            Login
          </Text>
        )
      case REGISTER:
        return (
          <Text style={styles.pageTitle}>
            Register
          </Text>
        )
    }
  }

  render() {
    var formType = this.props.formType;
    var loginButtonText = this.props.loginButtonText;
    var onButtonPress = this.props.onButtonPress;
    var MessageType = this.props.messageType;
    var actionsItems =  this.props.formActions;
    var messageTitle = this.getPageTitle(formType)
    var message = this.getMessage(MessageType, actionsItems);
    this.errorAlert.checkError(this.props.auth.form.error);
    return (
      <ScrollView width={width} height={height}>
        <View style={styles.container}>
          {messageTitle}
					<FormComponent
						formType={ formType }
						value={this.state.value}
						form={this.props.auth.form}
						onChange={this.onChange}
					/>
				<FormButton
					isDisabled={!this.props.auth.form.isValid}
					onPress={onButtonPress}
					buttonText={loginButtonText}
				/>
          {message}
        </View>
      </ScrollView>
    )
  }
}
