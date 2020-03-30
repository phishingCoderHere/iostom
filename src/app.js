const express = require('express')

const app = express()

const port = 8333;

app.listen(port, () => {
    console.info(`server running on port ${port}`);
})

app.get('/', (req, resp) => {
    console.info(`收到请求！`);
})