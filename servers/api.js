
// const request = require('../urils/http.js')
const baseUrl = 'http://bl.talelin.com/v1'
const appkey = 'bHrJ3O3wzz0ln0nz'

const request = (url, data) => {
	// console.log(appkey)
	// data.appkey = appkey
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


// request()
const getLatest =  () => {
	return request('/classic/latest')
}
const getNext = idx => {
	return request(`/classic/${idx}/next`)
}
const getPrev = idx => {
	return request(`/classic/${idx}/previous`)
}
// // 获取当前一期的下一期
// const getNext = idx => {
// 	return new Promise((reslove, reject) => {
// 		wx.request({
// 			url: `${baseUrl}/classic/${idx}/next`,
// 			data: { appkey },
// 			success: function (res) {
// 			   return reslove(res)
// 			},
// 			fail:function (err) {
// 			   return reject(err)
// 			}
// 		})
// 	})
// }
// // 获取当前一期的上一期
// const getPrev = idx => {
// 	return new Promise((reslove, reject) => {
// 		wx.request({
// 			url: `${baseUrl}/classic/${idx}/previous`,
// 			data: { appkey },
// 			success: function (res) {
// 			   return reslove(res)
// 			},
// 			fail:function (err) {
// 			   return reject(err)
// 			}
// 		})
// 	})
// }

module.exports = {
	getLatest,
	getNext,
	getPrev
}
