function init(){
    var app = new Vue({
        el: '#app',
        data: {
            message: '初始化！'
        }
    })
}

module.exports = {
    init: init
}