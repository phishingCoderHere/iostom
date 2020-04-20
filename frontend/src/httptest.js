const httpUtils = require('./utils/httpUtils.js')

httpUtils.sendRequest('localhost', '/course/condition.do', 'GET', 8445, (data) => {
    console.log(JSON.parse(data.toString('utf8')));
})