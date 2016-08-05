const {
	GET_SUBSCRIBED_FEEDS,
	GET_FEEDS,
	SUBSCRIBE_FEED,
	UNSUBSCRIBE_FEED
} = require('../constants').default;

import _ from 'lodash'
import AppToken from '../AppToken';
import {Actions} from 'react-native-router-flux';
import BackendFactory  from '../BackendFactory';


export function getSubscribedFeeds(json) {
	return {
		type: GET_SUBSCRIBED_FEEDS,
		payload: json
	}
}

export function getFeedSuccess(json) {
	return {
		type: GET_FEEDS,
		payload: json
	}
}

export function subscribeFeed() {
	return {
		type: SUBSCRIBE_FEED
	}
}

export function unsubscribeFeed() {
	return {
		type: UNSUBSCRIBE_FEED
	}
}

// Subscribe Feed

export function subscribeToFeed(id) {
	return dispatch => {
		return new AppToken().getToken()
		.then((token) => {
			if(!_.isNull(token)) {
				BackendFactory(token.token).subscribeFeed(id).
				then((json) => {
					dispatch(subscribeFeed());
					Actions.drawer()
				})
				.catch((error) => {
				})
			}
		})
		.catch((error) => {

		})
	}
}

// Unsubscribe Feed

export function unsubscribeToFeed(id) {
	return dispatch => {
		return new AppToken().getToken()
		.then((token) => {
			if(!_.isNull(token)) {
				BackendFactory(token.token).unSubscribeFeed(id)
				.then((json) => {
					dispatch(unsubscribeFeed());
					Actions.drawer()
				})
				.catch((error) => {

				})
			}
		})
	}
}

// Get Feed

export function getFeed(){
	return dispatch => {
		return new AppToken().getToken()
		.then((token) => {
			if(!_.isNull(token)) {
				return BackendFactory(token.token).getFeed()
				.then((json) => {
					dispatch(getFeedSuccess(json.data))
					return json.data
				})
			}
		})
	}
}

// Get Subscribed feeds

export function getSubscribeFeeds() {
	return dispatch => {
		return new AppToken().getToken()
		.then((token) => {
			if(!_.isNull(token)) {
				BackendFactory(token.token).getSubscribedFeeds()
				.then((json) => {
					dispatch(getSubscribedFeeds(json.data.feeds));
          return Promise.all(json.data.feeds);
				});
			} else {
				Actions.MainPage()
			}
		}).catch((error) => {
		})
	}
}
