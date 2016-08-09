module.exports = {
	backend: {
		local: false,
		remote: true
	},
	READABILITY: {
		token: ''  // Readability Parse API Token
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
