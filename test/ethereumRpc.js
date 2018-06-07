const request = require('request');

// helper function that returns a promise of the result of an ethereum-rpc call to a specified url
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
    request(options, (error, response, responseBody) => {
        if (error) {
          reject('Connect Error: ' + error.toString())
        } else {
          resolve(responseBody)
        }
    })
  })
}

module.exports = rpcRequest
