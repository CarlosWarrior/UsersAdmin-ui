import axios from 'axios' 
import config from './config.json'

const auth = axios.create({
	baseURL: config.api_url,
}) 

const token = (t) =>  {
	const p = axios.create({
		baseURL: config.api_url,
	})
	p.defaults.headers.common['token'] = t
	return p
}

export default {auth, token }