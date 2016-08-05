const  {
  GET_SUBSCRIBED_ARTICLES,
  ALL_SUBSCRIBED_ARTICLES_LOADED,
  GET_FEED_ARTICLES,
  FEED_ARTICLES_LOADED,
  GET_ARTICLE,
	GET_ARTICLE_REQUEST
} = require('../constants').default;
import {REHYDRATE} from 'redux-persist/constants'

const initialState = {
	articles: [],
	isFetching: false,
	article_detail: {},
	feed: {
		feedId: null,
		articles: [],
		loaded: false
	},
	allLoaded: false
};

export default function articleReducer(state = initialState, action) {
	switch(action.type) {

    case REHYDRATE:
      let incoming = action.payload.articles;
      if(incoming) {
        return {
          ...state,
          ...incoming
        };
      }
      return state;
		case GET_ARTICLE_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case GET_ARTICLE:
		  return {
				...state,
				isFetching: false,
				article_detail: action.payload
			};
		case GET_SUBSCRIBED_ARTICLES:
  		return {
  			...state,
  			articles: [
  				...state.articles,
  				...action.articles
  			],
  			allLoaded: state.allLoaded
  		};
		case GET_FEED_ARTICLES:
		if (state.feed.feedId !== action.feedId) {
			return {
				...state,
				feed: {
					feedId: action.feedId,
					articles: action.articles
				}
			}
		}
			return {
				...state,
				feed: {
					feedId: action.feedId,
					articles: [
						...state.feed.articles,
						...action.articles
					]
				}
			}
		case ALL_SUBSCRIBED_ARTICLES_LOADED:
  		return {
  			...state,
  			feed: {
  				loaded: true
  			}
  		}
		case FEED_ARTICLES_LOADED:
		  return {
			  ...state,
			  feed: {
				 loaded: true
			 }
		  }
		default:
		 return state;
	}
}
