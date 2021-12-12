const {
    getBookDetailById,
    getSortComments
} = require('../../servers/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {},
        comments: [],
        colors: ['red', 'yellow', 'blue', 'gray', 'cyan', 'green']
    },
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
      },
    getData (id) {
        getBookDetailById(id).then(res => {
            // console.log(res)
			if (res.statusCode === 200) {

                var result = res.data
                result.summary = result.summary.replace('\n', '')

				this.setData({
                    detail: result
                }, () => {
                    console.log(this.data.detail.summary)
                })
			} else {
                wx.showToast({
                  title: res.data.msg,
                })
            }
        }).catch(err => {
            console.log(err)
        })

        getSortComments(id).then(res => {
            if (res.statusCode === 200) {
                var len = this.data.colors.length

                var comments = res.data.comments
                
                comments.forEach(item => {
                    var color = this.data.colors[this.getRandomInt(0, len)]
                    item.color = color
                })
                // comments
				this.setData({
                    comments
                })
			} else {
                wx.showToast({
                  title: res.data.msg,
                })
            }

        }).catch(err => {
            console.log(err)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData(options.id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})