import {api, axiosDefault as axios} from 'create-api'
import config from './../config'
import querystring from 'querystring'

export function fetchApi (req) {
  const QUERY_PATH = (req.method === 'get') ? '?' + Object.entries(req.props).map((pair) => pair.map(encodeURIComponent).join('=')).join('&') : ''
  const REQUEST_URI = req.url + QUERY_PATH
  const CACHE_KEY = REQUEST_URI
  const API_URL = config.api.requests[req.method] + '/' + REQUEST_URI

  const cache = api.cachedItems

  if (cache && cache.has(CACHE_KEY)) {
    return Promise.resolve(cache.get(CACHE_KEY))
  }

  return axios.request({
    method: req.method,
    url: API_URL,
    data: (req.method === 'post') ? querystring.stringify(req.props) : {}
  }).then((response) => {
    return response.data
  }).then((json) => {
    return json
  }).then((json) => {
    cache && cache.set(CACHE_KEY, json)
    return json
  })
}
