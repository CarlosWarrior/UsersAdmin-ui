import axios from './axios'
import config from './config.json'
const defaultError = (response, source) => {
	console.error(response, source)
}
const handleError = (e, callback, source) => {
	if(e.response && e.response.status && e.response.status == 401)
		logout()
	else
		callback(e, source)
}

export const logout = () => {
	window.localStorage.removeItem(config.tokenName)
	window.location.href = '/login'
}

export const usersAPI = {
	list: (callback, error = defaultError) => {
		axios.token(window.localStorage.getItem(config.tokenName))
			.get('/users/')
			.then(r => callback(r.data))
			.catch(e => handleError(e, error, "users/list"))
	},
	create:(bundle, callback, error = defaultError) => {
		axios.token(window.localStorage.getItem(config.tokenName))
			.post('/users', bundle)
			.then(r => callback(r.data))
			.catch(e => handleError(e, error, "bundle/create"))
	},
	update:(scid, body, callback, error = defaultError) => {
		axios.token(window.localStorage.getItem(config.tokenName))
			.put('/users/'+scid, body)
			.then(r => callback(r.data))
			.catch(e => handleError(e, error, "bundle/update"))
	},
	delete:(scid, callback, error = defaultError) => {
		axios.token(window.localStorage.getItem(config.tokenName))
			.post('/users/delete/'+scid)
			.then(r => callback(r.data))
			.catch(e => handleError(e, error, "bundle/delete"))
	},
}