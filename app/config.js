module.exports = {
	backend: {
		local: false,
		remote: true
	},
	READABILITY: {
		token: 'de7d7213db12f5b7342fb3f48c6bc1cd86cc7ecb'  // Readability Parse API Token
	},
	API: {
		local: {
			url: 'http://localhost:3000/api/'
		},
		remote: {
			url: 'https://readr.meetgodhani.com/api/'
		}
	}
}
