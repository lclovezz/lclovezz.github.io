const timestampToDate = function(timestamp, type = 0) {

    const date = new Date(Math.floor(timestamp))

    const year = date.getFullYear(); // 获取年份
    let month = date.getMonth() + 1; // 获取月份（注意月份从0开始，需要加1）
    if (month < 10) {
        month = '0' + month
    }
    let day = date.getDate(); // 获取日期
    if (day < 10) {
        day = '0' + day
    }
    let hour = date.getHours(); // 获取小时
    if (hour < 10) {
        hour = '0' + hour
    }
    let minute = date.getMinutes(); // 获取分钟
    if (minute < 10) {
        minute = '0' + minute
    }
    let second = date.getSeconds(); // 获取秒数
    if (second < 10) {
        second = '0' + second
    }
    let returnResult = year + '-' + month + '-' + day
    if (type === 1) {
        returnResult = returnResult + ' ' + hour + ':' + minute + ':' + second
    } else if(type == 2) {
        returnResult = hour + ':' + minute + ':' + second
    }
    return returnResult
}

const generateTime = function() { return new Date().toLocaleDateString() }

const generateTimeFromDate = function(dateString) {
    // 解析日期字符串为Date对象，假设日期字符串格式为"YYYY-MM-DDTHH:mm:ss"
    const date = new Date(dateString)

    // 检查日期是否有效
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string')
    }

    // 获取毫秒级时间戳
    let timestamp = date.getTime()

    // 确保时间戳为13位数字，这里一般情况下不需要特别处理，因为JavaScript的Date对象默认返回的就是毫秒级时间戳
    // 但是，如果需要确保至少13位，可以使用以下代码：
    // timestamp = timestamp.toString().padStart(13, '0');

    return timestamp
}

export {
    timestampToDate,
    generateTime,
    generateTimeFromDate
}