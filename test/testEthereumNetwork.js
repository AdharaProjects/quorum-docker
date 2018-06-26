const expect = require('chai').expect
const ethereumRpc = require('./ethereumRpc')

const node1RpcUrl = 'http://' + (process.env.NODE_1_URL || '172.14.0.2' ) + ':20010'
const node2RpcUrl = 'http://' + (process.env.NODE_2_URL || '172.14.0.3' ) + ':20010'
const node3RpcUrl = 'http://' + (process.env.NODE_3_URL || '172.14.0.4' ) + ':20010'

describe("3 node ethereum Network", function() {
  this.timeout(10*1000)

  it("should sync the network of 3 nodes, all should be syncing the same blocks", async function() {
    const latestBlock = JSON.parse(
      await ethereumRpc(
        node1RpcUrl,
        '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
      )
    ).result
    const latestBlockHashNode1 = JSON.parse(
      await ethereumRpc(
        node1RpcUrl,
        '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["' + latestBlock + '", true],"id":1}'
      )
    ).hash
    const latestBlockHashNode2 = JSON.parse(
      await ethereumRpc(
        node2RpcUrl,
        '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["' + latestBlock + '", true],"id":1}'
      )
    ).hash
    const latestBlockHashNode3 = JSON.parse(
      await ethereumRpc(
        node3RpcUrl,
        '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["' + latestBlock + '", true],"id":1}'
      )
    ).hash

    expect(latestBlockHashNode1).to.equal(latestBlockHashNode2).to.equal(latestBlockHashNode3)
  })
})
