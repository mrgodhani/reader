const  {
  GET_SUBSCRIBED_ARTICLES,
  ALL_SUBSCRIBED_ARTICLES_LOADED,
  GET_FEED_ARTICLES,
  FEED_ARTICLES_LOADED,
  GET_ARTICLE,
  GET_ARTICLE_REQUEST
} = require('../constants').default;

import _ from 'lodash';
import AppToken from '../AppToken';
import BackendFactory from '../BackendFactory';

export function getSubscribedFeedArticles(json) {
	return {
		type: GET_SUBSCRIBED_ARTICLES,
		articles: json
	}
}

export function articleDetailRequest() {
  return {
    type: GET_ARTICLE_REQUEST
  }
}

export function allSubscribedArticlesLoaded() {
	return {
		type: ALL_SUBSCRIBED_ARTICLES_LOADED
	}
}

export function getFeedArticles(feedId,json) {
	return {
		type: GET_FEED_ARTICLES,
		feedId: feedId,
		articles: json
	}
}

export function allFeedArticlesLoaded() {
	return {
		type: FEED_ARTICLES_LOADED
	}
}

export function getArticleDetail(json) {
	return {
		type: GET_ARTICLE,
		payload: json
	}
}

// Get Articles by specific feed

export function getArticleByFeed(feedId,page) {
  return dispatch => {
    return new AppToken().getToken()
    .then((token) => {
      if(!_.isNull(token)){
        return BackendFactory(token.token).getArticlesByFeed(feedId,page)
        .then((json) => {
          if(json.data.length > 0) {
						dispatch(getFeedArticles(feedId,json.data))
						return Promise.all(json.data)
          } else {
						dispatch(allFeedArticlesLoaded())
            return Promise.all(json.data)
					}
        })
				.catch((error) => {
				})
      }
    })
		.catch((error) => {
		})
  }
}

// Get Specific Article Content

export function getArticle(id) {
	return dispatch => {
    dispatch(articleDetailRequest())
		return new AppToken().getToken()
		.then((token) => {
			if(!_.isNull(token)) {
				return BackendFactory(token.token).getArticle(id)
				.then((json) => {
					if(json.data){
						dispatch(getArticleDetail(json.data))
						return Promise.all(json.data)
					}
				})
				.catch((error) => {
				})
			}
		})
		.catch((error) => {
		})
	}
}

// Get Articles

export function getSubscribedArticles(page) {
	return dispatch => {
		return new AppToken().getToken()
		.then((token) => {
			if(!_.isNull(token)) {
				return BackendFactory(token.token).getSubscribedArticles(page)
				.then((json) => {
					if(json.data.length > 0) {
						dispatch(getSubscribedFeedArticles(json.data));
						return Promise.all(json.data)
					} else {
						dispatch(allSubscribedArticlesLoaded())
            return Promise.all(json.data)
					}
				}).catch((error) => {
				});
			}
		})
		.catch((error) => {
		});
	}
}
