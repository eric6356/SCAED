console.log(process.env.RINKEBY_HOST)

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      host: 'localhost',
      port: 8545,
      network_id: 0x04,
      from: '0x0d6eafe9ca0258b97839b07230a7ea8fa61b632a'
    }
  }
}
