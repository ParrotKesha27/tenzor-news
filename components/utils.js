import config from './config'

export async function fetchPost(category, id) {
	let response = await fetch(config.serverUrl + '/api/v1/posts/'+category+'/'+id)

	return await response.json()
}