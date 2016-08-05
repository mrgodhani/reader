import React, { Component } from 'react';
import Button from 'apsl-react-native-button';
import {
	View,
	StyleSheet,
	Text
} from 'react-native';

var styles =  StyleSheet.create({
  button: {
    backgroundColor: '#3023AE',
    borderColor: '#3023AE',
    borderWidth: 2,
    borderRadius: 15
  },
  buttonText: {
    fontFamily: 'OpenSans-SemiBold',
    color: 'white'
  }
})

export default class FormButton extends Component {
	render() {
		return (
			<View style={styles.signin}>
        <Button style={styles.button}
          isDisabled={this.props.isDisabled}
          onPress={this.props.onPress}
          textStyle={styles.buttonText}>
          {this.props.buttonText}
        </Button>
			</View>
		);
	}
}
