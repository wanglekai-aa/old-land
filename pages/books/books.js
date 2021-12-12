// pages/book/book.js
const {
    getHotBooks,
    getHotKeyword,
    searchBook
} = require('../../servers/api.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        hot_keywords: [],
        searchIsShow: false,
        keyworld: '',
        start: 0,
        count: 20, // 记录条数，默认为20,超过依然按照20条计算
        summary: 1, // 返回完整或简介,默认为0,0为完整内容,1为简介
        // q:搜索内容,比如你想搜索python相关书籍,则输入python
        searchList: [],
        isReachBottom: false
    },
    getData () {
        getHotBooks().then(res => {
            if (res.statusCode === 200) {
				this.setData({
					books: res.data
				})
            } else {
				// console.log(res)
                wx.showToast({
                  title: res.data.msg,
                  icon: "none"
                })
            }
        }).catch(err => {
            console.log(err)
        })
        getHotKeyword().then(res => {
            if (res.statusCode === 200) {
                // console.log(res.data)
                this.setData({
                    hot_keywords: res.data.hot
                })
            } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: "none"
                })
            }
        }).catch(err => [
            console.log(err)
        ])
    },
    navigatorTo (option) {
        var id = option.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/book-detail/book-detail?id=' + id,
        })
    },
    handleSearchClick () {
        // console.log('ad')
        this.setData({
            searchIsShow: true
        })
    },
    handleCancelClick () {
        this.setData({
            searchIsShow: false,
            searchList: [],
            keyworld: ''
        })
    },
    handleClearKeyworld () {
        if (this.data.keyworld.trim() === '') return
        this.setData({
            keyworld: '',
            searchList: []
        })
    },
    // 确认开始进行搜索
    handleConfirmClick (e) {
        // console.log(e.detail.value)
        let keyworld = this.data.keyworld

        if (e.currentTarget.dataset.keyworld) {
            keyworld = e.currentTarget.dataset.keyworld
            this.setData({ keyworld })
        }
        // console.log(e)
        searchBook({
            start: this.data.start,
            count: this.data.count,
            summary: this.data.summary,
            q: keyworld
        }).then(res => {
            // console.log(res)
            if (res.statusCode === 200) {
                // var books = res.data.books
                if (res.data.total !== 0) {
                    this.setData({
                        searchList: [
                            ...this.data.searchList,
                            ...res.data.books
                        ],
                        // searchIsShow: false
                    })
                    if (this.data.total > this.data.count) {
                        this.setData({
                            isReachBottom: true
                        })
                    }
                } else {
                    wx.showToast({
                      title: this.data.keyworld + ' 没有搜索到内容，请更换关键词',
                      icon: "none"
                    })
                }
            } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: "none"
                })
            }
        }).catch(err => {
            console.log(err)
        })
    },
    handleSearchInput (e) {
        // console.log(e.detail.value)
        this.setData({
            keyworld: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
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
        console.log('down')
        if (!this.data.isReachBottom) return

        this.setData({
            count: ++this.data.count
        }, () =>  {
            this.handleConfirmClick()
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})