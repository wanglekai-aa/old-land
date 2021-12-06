const baseUrl = 'http://bl.talelin.com/v1'
const appkey = 'bHrJ3O3wzz0ln0nz'

const request = (url, data) => {
	data.appkey = appkey
	return new Promise((reslove, reject) => {
		wx.request({
			url: baseUrl + url,
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

module.exports = request
