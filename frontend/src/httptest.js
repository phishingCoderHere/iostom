const httpUtils = require('./utils/httpUtils.js')

httpUtils.sendRequest('localhost', '/quickstart/condition.do', 'GET', 8445, (data) => {
    console.log(JSON.parse(data.toString('utf8')));
})