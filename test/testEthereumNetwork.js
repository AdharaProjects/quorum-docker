const expect = require('chai').expect
const ethereumRpcTester = require('./ethereumRpcTester')

const node1RpcUrl = 'http://172.14.0.2:20010'
const node2RpcUrl = 'http://172.14.0.3:20010'
const node3RpcUrl = 'http://172.14.0.4:20010'

describe("3 node ethereum Network", function() {
  this.timeout(10*1000)

  it("should sync the network of 3 nodes, all should be syncing the same blocks", async function() {
    const latestBlock = JSON.parse(
      await ethereumRpcTester(
        node1RpcUrl,
        '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
      )
    ).result
    console.log('latestBlock', latestBlock)
    const latestBlockHashNode1 = JSON.parse(
      await ethereumRpcTester(
        node1RpcUrl,
        '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["' + latestBlock + '", true],"id":1}'
      )
    ).hash
    const latestBlockHashNode2 = JSON.parse(
      await ethereumRpcTester(
        node2RpcUrl,
        '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["' + latestBlock + '", true],"id":1}'
      )
    ).hash
    const latestBlockHashNode3 = JSON.parse(
      await ethereumRpcTester(
        node3RpcUrl,
        '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["' + latestBlock + '", true],"id":1}'
      )
    ).hash

    expect(latestBlockHashNode1).to.equal(latestBlockHashNode2).to.equal(latestBlockHashNode3)
  })
})
