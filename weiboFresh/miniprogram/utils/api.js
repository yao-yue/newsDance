const formatTime = date => {
    var dateNow = new Date();
    var date = new Date(date);
    const hour = date.getHours()
    const minute = date.getMinutes()
    var times = (dateNow - date) / 1000;
    let tip = '';
    if (times <= 0) {
        tip = '刚刚'
        return tip;
    } else if (Math.floor(times / 60) <= 0) {
        tip = '刚刚'
        return tip;
    } else if (times < 3600) {
        tip = Math.floor(times / 60) + '分钟前'
        return tip;
    }
    else if (times >= 3600 && (times <= 86400)) {
        tip = Math.floor(times / 3600) + '小时前'
        return tip;
    } else if (times / 86400 <= 1) {
        tip = Math.ceil(times / 86400) + '昨天'
    }
    else if (times / 86400 <= 31 && times / 86400 > 1) {
        tip = Math.ceil(times / 86400) + '天前'
    }
    else if (times / 86400 >= 31) {
        tip = '好几光年前~~'
    }
    else tip = null;
    return tip + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}



// 这是另一种形式  备注以免混淆
var getTip = function (date) {
    var dateNow = new Date();
    var date = new Date(date);
    var timer = (dateNow - date) / 1000
    var tip = ''
    if (timer <= 0) {
        tip = '刚刚'
    } else if (Math.floor(timer / 60) <= 0) {
        tip = '刚刚'
    } else if (timer < 3600) {
        tip = Math.floor(timer / 60) + '分钟前'
    } else if (timer >= 3600 && (timer <= 86400)) {
        tip = Math.floor(timer / 3600) + '小时前'
    } else if (timer / 86400 <= 31) {
        tip = Math.ceil(timer / 86400) + '天前'
    } else {
        tip = '几光年以前~~'
    }
    return tip
}

//向外暴露
module.exports = {
    formatTime: formatTime,
    getTip: getTip
}