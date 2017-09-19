// This is our App Service.
// This is our data.
var helloData = {
  name: 'WeChat'
}

// Register a Page.
Page({
  data: helloData,
  changeName: function (e) {
    // sent data change to view
    this.setData({
      name: 'MINA'
    })
  }
})