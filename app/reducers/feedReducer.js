const {
	GET_SUBSCRIBED_FEEDS,
	GET_FEEDS
} = require('../constants').default;
import {REHYDRATE} from 'redux-persist/constants'
const InitialState = require('../states/feedInitialState').default;
const iState = new InitialState


export default function feedReducer(state = iState, action) {
	switch(action.type) {
		case REHYDRATE:
      let incoming = action.payload.feed;
      if(incoming) {
        return {
          feeds: incoming.feeds,
					subscribedFeeds: incoming.subscribedFeeds
        };
      }
      return state;
		case GET_FEEDS:
			return {
				...state,
				feeds: action.payload
			}
		case GET_SUBSCRIBED_FEEDS:
			return {
				...state,
				subscribedFeeds: action.payload
			}
		default:
			return state;
	}
}
