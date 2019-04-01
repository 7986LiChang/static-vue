function init(){
    let app = new Vue({
        el: '#app',  //绑定的元素
        data: {
            message: '初始化！',
            messageHtml: `<span>好的，201904001</span>`,
            use: false,
            see: true,
            url: 'http://www.jd.com',
            curDate: new Date().valueOf(),
            seeMe: function () {
                console.log('see');
            }
        },
        methods: {
            reverseMessage: function () {
                this.message = this.message.split('').reverse().join('');
            }
        },
        filters: {
            //时间戳格式化
            dateFormat: function (datetime, type = 1) {
                if (datetime) {
                    datetime = Number(datetime);
                    let nowDate = new Date(datetime),
                        _year = nowDate.getFullYear(),
                        _month = nowDate.getMonth() + 1,
                        _date = nowDate.getDate(),
                        _hour = nowDate.getHours(),
                        _minute = nowDate.getMinutes(),
                        _second = nowDate.getSeconds(),
                        date_result;
                    _month = _month > 9 ? _month : `0${_month}`;
                    _date = _date > 9 ? _date : `0${_date}`;
                    _hour = _hour > 9 ? _hour : `0${_hour}`;
                    _minute = _minute > 9 ? _minute : `0${_minute}`;
                    _second = _second > 9 ? _second : `0${_second}`;
                    switch (type) {
                        case 1:
                            date_result = `${_year}-${_month}-${_date} ${_hour}:${_minute}:${_second}`;
                            break;
                        case 2:
                            date_result = `${_year}/${_month}/${_date} ${_hour}:${_minute}:${_second}`;
                            break;
                        case 3:
                            date_result = Date.parse(`${_year}/${_month}/${_date} 0:0:0`);
                            break;
                        case 4:
                            date_result = nowDate;
                            break;
                    }
                    return date_result;
                } else {
                    return '';
                }
            }
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