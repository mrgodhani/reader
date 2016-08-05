import store from 'react-native-simple-store';

export default class AppToken {
	constructor() {
		this.KEY = 'reader_token';
	}

// Store Token
	storeToken(token) {
		return store.save(this.KEY, {
			token: token
		});
	}

// Get token
	getToken(token) {
		if(token) {
			return store.save(this.KEY, {
				token: token
			}).then(() => {
				return store.get(this.KEY);
			});
		}
		return store.get(this.KEY);
	}

// Delete token
	deleteToken() {
		return store.delete(this.KEY);
	}
}
