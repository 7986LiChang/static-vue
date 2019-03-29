function init(){
    let app = new Vue({
        el: '#app',  //绑定的元素
        data: {
            message: '初始化！'
        }
    }),
        app2 = new Vue({
            el: '#app-2',
            data: {
                message: '当前时间：' + new Date().toUTCString()
            }
        });
}

module.exports = {
    init: init
}