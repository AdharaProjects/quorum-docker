const request = require('request');

function rpcRequest(url, body) {
  const options = {
    url,
    method: "post",
    headers:
    {
      "content-type": "text/plain"
    },
    body
  }
  return new Promise(function(resolve, reject){
    request(options, (error, response, body) => {
        if (error) {
          reject('Connect Error: ' + error.toString())
        } else {
          resolve(body)
        }
    })
  })
}

module.exports = rpcRequest
