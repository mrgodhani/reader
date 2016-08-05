require('regenerator/runtime');

import _ from 'lodash';
import axios from 'axios';
import CONFIG from './config';

export default class RESTApi {
	constructor(token) {
		let url = CONFIG.backend.local ? CONFIG.API.local : CONFIG.API.remote;
		this.fetchData = axios.create({
			baseURL: url.url,
			headers: !_.isNull(token) ? {
				'Authorization' : 'Bearer ' + token
			} : {}
		})
	}

// Login
	async login(data) {
		return await this.fetchData.post('/login',data)
	}

// Get Subscribed Feeds
	async getSubscribedFeeds() {
		return await this.fetchData.get('/users');
	}

// Register
	async signup(data) {
		return await this.fetchData.post('/register', data)
	}

// Get Feeds
	async getFeed() {
		return await this.fetchData.get('/feeds');
	}

// Subscribe Feed
	async subscribeFeed(id) {
		return await this.fetchData.post('/feeds/subscribe/' + id);
	}

// Unsubscribe Feed
	async unSubscribeFeed(id) {
		return await this.fetchData.post('/feeds/unsubscribe/' + id);
	}

// Get Article
  async getArticle(id) {
		return await this.fetchData.get('/articles/' + id);
	}

// Get Subscribed Articles
	async getSubscribedArticles(page) {
		return await this.fetchData.get('/articles?page=' + page);
	}

// Get Articles by specific feed
	async getArticlesByFeed(feedid,page) {
		return await this.fetchData.get('/feeds/' + feedid + '/articles?page=' + page);
	}

}
