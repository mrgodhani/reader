import React, {PropTypes,Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as authActions from '../actions/authAction';
import * as globalActions from '../actions/globalAction';
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button';
import MainBg from '../images/mainpage-bg.png';
import {StatusBar} from 'react-native';

import {
  Image,
  View,
  NetInfo,
  StyleSheet,
  Text
} from 'react-native'

const actions = [
  authActions,
  globalActions
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

var styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 50
  },
  logoTitle: {
    fontFamily:'Montserrat-Bold',
    fontSize: 65,
    color: 'white'
  },
  subHeading: {
    fontFamily:'OpenSans',
    fontSize:18,
    marginTop:5,
    marginBottom: 25,
    color: 'white'
  },
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

class App extends Component {

	checkConnection = (reach) => {
		this.props.actions.checkConnection(reach);
	}

	componentDidMount = () => {
		this.props.actions.getToken();
		NetInfo.addEventListener('change',this.checkConnection);
		StatusBar.setBarStyle('light-content');
	}

  render() {
    return(
      <View style={styles.container}>
        <View style={{position:'absolute',top: 0, bottom: 0, left: 0, right: 0}}>
          <Image source={MainBg} style={{ flex:1, width: null, height: null, resizeMode: 'stretch' }} />
        </View>
        <Text style={styles.logoTitle}>reader</Text>
        <Text style={styles.subHeading}>Simple RSS feed reader</Text>
        <Button style={styles.button} textStyle={styles.buttonText} onPress={() => Actions.Login()}>
          Login
        </Button>
        <Button style={styles.button} textStyle={styles.buttonText} onPress={() => Actions.Register()}>
          Register
        </Button>
      </View>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
