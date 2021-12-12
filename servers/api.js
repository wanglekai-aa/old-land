
const baseUrl = 'http://bl.talelin.com/v1'
const appkey = 'bHrJ3O3wzz0ln0nz'

const request = (url, data, method) => {
	return new Promise((reslove, reject) => {
		wx.request({
			url: baseUrl + url + '?appkey=' + appkey,
			method: method || 'GET',
			data,
			success: function (res) {
			   return reslove(res)
			},
			fail:function (err) {
			   return reject(err)
			}
		})
	})
}

const getLatest =  () => {
	return request('/classic/latest')
}
const getNext = idx => {
	return request(`/classic/${idx}/next`)
}
const getPrev = idx => {
	return request(`/classic/${idx}/previous`)
}
// 进行点赞
const onLike = (art_id, type) => {
	return request(`/like`, {
		art_id, type
	}, 'POST')
}
// 取消点赞 
const likeCancel = (art_id, type) => {
	return request(`/like/cancel`, {
		art_id, type
	}, 'POST')
}
// 获取点赞信息
const getFavor = (type, id) => {
	return request(`/classic/${type}/${id}/favor`)
}
// 获取热门书籍(概要) 
const getHotBooks = () => {
	return request('/book/hot_list')
}
// 获取书籍详细信息
const getBookDetailById = id => {
	return request(`/book/${id}/detail`)
}
// 获取书籍短评
const getSortComments = id => {
	return request(`/book/${id}/short_comment`)
}
module.exports = {
	getLatest,
	getNext,
	getPrev,
	onLike,
	likeCancel,
	getFavor,
	getHotBooks,
	getBookDetailById,
	getSortComments
}
