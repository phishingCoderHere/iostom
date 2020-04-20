const sendRequest = (host, path, method, port, callback) => {
    // 引入http模块
    const http = require('http');

    // 创建一个请求
    let request = http.request(
        {
            protocol: 'http:',     // 请求的协议
            host: host,   // 请求的host
            port: port,              // 端口
            method: method,         // GET请求
            timeout: 2000,         // 超时时间
            path: path              // 请求路径
        },
        (res) => {
            console.log(`状态码: ${res.statusCode}`);
            console.log(`响应头: ${JSON.stringify(res.headers)}`);
            // res.setEncoding('utf8');
            let responseTxt = ''
            res.on('data', (chunk) => {
                responseTxt += chunk
                // console.log(`响应主体: ${chunk}`);
            });
            res.on('end', () => {
                callback(responseTxt)
                // console.log('响应中已无数据');
            });
        }
        // res => {  // 连接成功后，接收到后台服务器返回的响应，回调函数就会被调用一次。
        //     // res => http.IncomingMessage : 是一个Readable Stream
        //     res.on('data', data => {
        //         // console.log(data.toString('utf8')); // 打印返回的数据。
        //         callback(data)
        //     });
        // }
    );

    // 设置请求头部
    request.setHeader('Cache-Control', 'max-age=0');

    // 真正的发送请求
    request.end();
}

module.exports.sendRequest = sendRequest;