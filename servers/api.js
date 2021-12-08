
const baseUrl = 'http://bl.talelin.com/v1'
const appkey = 'bHrJ3O3wzz0ln0nz'

const request = (url, data) => {
	return new Promise((reslove, reject) => {
		wx.request({
			url: baseUrl + url,
			data: {
				...data,
				appkey
			},
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

module.exports = {
	getLatest,
	getNext,
	getPrev
}
