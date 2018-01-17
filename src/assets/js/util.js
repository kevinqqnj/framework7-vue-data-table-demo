function toSmartDate(timestamp) {
    // console.log(timestamp)
    // if (typeof(timestamp)==='string') {   //'2017-10-08 13:48:06.579323' => Unix时间戳
    //   timestamp = parseInt((new Date(timestamp)).getTime())/1000 ;
    //     // timestamp = (parseInt((new Date(timestamp)).getTime())/1000+28800) ; // UTC -> GMT+8
    // }
    if (isNaN(timestamp) || timestamp==="") {
        return '';
    }
    else {
    timestamp = parseInt(timestamp); // Python time.time() is like: 1477884451.383(s) UTC UNIX timestame. calendar.timegm(d.utctimetuple())
    }
//    console.log(timestamp)
    var
        today = new Date(),
        now = today.getTime()/1000,      // Javascript getTime() is like: 1477884519957(ms), no "."
        s = '1分钟前',
        t = now - timestamp;
        // console.log(now)
        // console.log(t)
    if (t > 7776000) {
        // 3 months ago:
        var that = new Date(timestamp*1000);
        var
            y = that.getFullYear(),
            m = that.getMonth() + 1,
            d = that.getDate(),
            hh = that.getHours(),
            mm = that.getMinutes();
        s = y===today.getFullYear() ? '' : y + '年';
        s = s + m + '月' + d + '日' + hh + ':' + (mm < 10 ? '0' : '') + mm;
    }
    else if (t >= 2592000) {
        // 30-90 days ago:
        s = Math.floor(t / 2592000) + '月前';
    }
    else if (t >= 86400) {
        // 1-30 days ago:
        s = Math.floor(t / 86400) + '天前';
    }
    else if (t >= 3600) {
        // 1-23 hours ago:
        s = Math.floor(t / 3600) + '小时前';
    }
    else if (t >= 60) {
        s = Math.floor(t / 60) + '分钟前';
    }
    return s;
}

function myfun() {
console.log('========= Success myfun')
}

function myfun2(s) {
console.log('========= Success from fun2: ' + s)
}

function short_str(title) {
    return title.length>16? title.substr(0,16)+'...' : title
}

export { //很关键
  toSmartDate, myfun2, short_str
}
