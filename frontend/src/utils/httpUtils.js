const sendRequest = (options) => {
    const { host, path, method, port, callback, params: data } = options;
    // 引入http模块
    const http = require('http');

    // 创建一个请求
    let request = http.request(
        {
            protocol: 'http:',      // 请求的协议
            host: host,             // 请求的host
            port: port,                 // 端口
            method: method,
            timeout: 2000,         // 超时时间
            path: path,              // 请求路径
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
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
    const json = JSON.stringify(data)
    if (data) {
        request.setHeader('Content-Length', Buffer.byteLength(json));
        request.write(Buffer.from(json))
    }
    // 真正的发送请求
    request.end();
}

module.exports.sendRequest = sendRequest;