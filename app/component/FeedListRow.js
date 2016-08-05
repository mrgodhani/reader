import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	View,
	StyleSheet,
  Image,
	Text,
	TouchableOpacity
} from 'react-native';
import smallcross from '../images/smallcross.png';
import checkmark from '../images/checkmark.png';

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		height: 50,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		justifyContent:'space-between'
	},
  rowText: {
    fontFamily: 'OpenSans',
    fontSize: 14,
		marginLeft: -175
  },
  favicon: {
    width: 20,
    height: 20,
		alignItems: 'flex-start',
		overflow: 'visible'
  },
	iconConfig: {
		width: 25,
		height: 25,
		alignItems: 'flex-start',
		overflow: 'visible'
	}
});

export default class FeedListRow extends Component
{
	subscribeFeed = () => {
		// if(!this.props.subscribed){
		// 	this.props.subscribe(this.props.id);
		// } else {
    //   this.props.unsubscribe(this.props.id);
    // }
		this.props.subscribeFeed(this.props.subscribed, this.props.id)
	}

	render() {
			return (
				<View style={styles.container}>
	        <Image source={{ uri: this.props.favicon }} style={styles.favicon} />
	        <Text style={styles.rowText}>
	          {this.props.title}
	        </Text>
					<TouchableOpacity onPress={this.subscribeFeed}>
							<Image source={this.props.subscribed ? smallcross : checkmark} style={styles.iconConfig} />
					</TouchableOpacity>
	      </View>
			);
	}
}
