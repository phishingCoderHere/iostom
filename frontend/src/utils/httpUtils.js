const sendRequest = (options) => {
    const { host, path, method, port, callback, params } = options;
    // 引入http模块
    const http = require('http');

    // 创建一个请求
    let request = http.request(
        {
            protocol: 'http:',      // 请求的协议
            host: host,             // 请求的host
            port: port,                 // 端口
            method: method,         // GET请求
            timeout: 2000,         // 超时时间
            path: path              // 请求路径
        },
        (res) => {
            let responseTxt = ''
            res.on('data', (chunk) => {
                responseTxt += chunk
            });
            res.on('end', () => {
                callback(responseTxt)
            });
        }
    );

    // 设置请求头部
    request.setHeader('Cache-Control', 'max-age=0');
    if (params) {
        request.setHeader('Content-Length', Buffer.byteLength(postData));
        const postData = JSON.stringify(params);
        request.write(postData)
    }
    // 真正的发送请求
    request.end();
}

module.exports.sendRequest = sendRequest;