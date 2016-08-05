import React, {PropTypes,Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as feedActions from '../actions/feedAction';
import {Actions} from 'react-native-router-flux';
import SearchBar from 'react-native-search-bar';
import FeedList from '../component/FeedListRow';

import {
  Image,
  View,
  StyleSheet,
	ListView,
	StatusBar,
	InteractionManager,
  Text
} from 'react-native'

const actions = [
  feedActions
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
		flex: 1,
		marginTop:62,
		backgroundColor: 'white'
	},
	separator: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#8E8E8E',
	}
});

class AddFeed extends Component {

	state = {
		dataSource: new ListView.DataSource({
			rowHasChanged: (row1,row2) => row1 !== row2
		})
	}

	fetchData = () => {
		this.props.actions.getFeed()
		.then((data) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(data)
			})
		}).catch((error) => {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.props.feed.feeds)
			})
		})
	}

	componentDidMount = () => {
		InteractionManager.runAfterInteractions(() => {
			this.fetchData()
		});
	}

	searchFeed = (text) => {
		var feeds = this.props.feed.feeds.filter((t) => {
			return t.title.toLowerCase().match(text.trim().toLowerCase());
		});
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(feeds)
		})
	}

	subscribeFeed = (subscribe, id) => {
		if(!subscribe) {
			this.props.actions.subscribeToFeed(id)
		} else {
			this.props.actions.unsubscribeToFeed(id)
		}
	}


  render() {
    var actionItems = this.props.actions;
		return (
			<View style={styles.container}>
				<SearchBar
					placeholder='Search'
					onChangeText={this.searchFeed}
					showsCancelButton={false}
					barTintColor='#393E41'
				/>
			<ListView
				dataSource={this.state.dataSource}
				enableEmptySections={true}
				renderRow={(data) => <FeedList {...data} subscribeFeed={(subscribe,id) => this.subscribeFeed(subscribe,id)} /> }
			/>
			</View>
		)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddFeed);
