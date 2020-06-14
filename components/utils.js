import config from './config'

export async function fetchPost(category, id) {
	let res = await fetch(config.serverUrl + '/api/v1/posts/'+category+'/'+id)

	return res;
}	