const fs = require('fs')
const Web3 = require('web3')

const tmPubKeys = [
  'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=',
  'QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=',
  'oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8=',
  'R56gy4dn24YOjwyesTczYa8m5xhP6hF2uTMCju/1xkY=',
  'UfNSeSGySeKg11DVNEnqrUtxYRVor4+CvluI8tVv62Y='
]
const auditorPubKey = tmPubKeys[0]
const bank1PubKey = tmPubKeys[1]
const bank2PubKey = tmPubKeys[2]
const bank3PubKey = tmPubKeys[3]

const web3s = [1, 2, 3, 4, 5].map(i => new Web3(`http://localhost:2200${i}`))
const auditorWeb3 = web3s[0]

const abi = JSON.parse(fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi'))
const data = '0x' + fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin').toString()

const contractAddrs = new Array(4)

const deploy = ({ web3, iBank, privateFor }) => web3.eth.getCoinbase()
  .then(coinbase => {
    return new web3.eth.Contract(abi)
      .deploy({ data })
      .send({
        from: coinbase,
        gas: 500000,
        gasPrice: 0,
        privateFor
      })
  }
  ).then(instance => {
    const address = instance.options.address
    console.log(`\nContract for Bank${iBank} mined: ${address}`)
    contractAddrs[iBank] = address
    return address
  })

const getContract = ({ iUser, iContract }) => {
  const web3 = web3s[iUser]
  const address = contractAddrs[iContract]
  const contract = new web3.eth.Contract(abi, address)
  return web3.eth.getCoinbase().then(coinbase => {
    contract.options.from = coinbase
    return contract
  })
}

const getValue = ({ iUser, iContract }) => {
  return getContract({ iUser, iContract }).then(contract => {
    const user = iUser ? `Bank${iUser}` : 'Auditor'
    console.log(`\nReading value by ${user} at Contract${iContract}...`)
    return contract.methods.get().call().then(console.log)
  })
}

const setValue = ({ iUser, iContract, value, privateFor }) => {
  return getContract({ iUser, iContract }).then(contract => {
    const user = iUser ? `Bank${iUser}` : 'Auditor'
    console.log(`\nSetting value to ${value} by ${user} at Contract${iContract} for ${privateFor}...`)
    return contract.methods.set(value).send({ privateFor: privateFor })
  })
}

Promise.all([
  deploy({ web3: auditorWeb3, iBank: 1, privateFor: [bank1PubKey] }),
  deploy({ web3: auditorWeb3, iBank: 2, privateFor: [bank2PubKey] }),
  deploy({ web3: auditorWeb3, iBank: 3, privateFor: [bank3PubKey] })
])
  .then(() => setValue({ iUser: 0, iContract: 1, value: 100, privateFor: [bank1PubKey] }))
  .then(() => getValue({ iUser: 0, iContract: 1 }))
  .then(() => getValue({ iUser: 1, iContract: 1 }))
  .then(() => getValue({ iUser: 2, iContract: 1 })).catch(e => console.log(e.message.split()[0]))

  .then(() => setValue({ iUser: 1, iContract: 1, value: 101, privateFor: [auditorPubKey] }))
  .then(() => getValue({ iUser: 0, iContract: 1 }))
  .then(() => getValue({ iUser: 1, iContract: 1 }))

  .then(() => setValue({ iUser: 0, iContract: 2, value: 200, privateFor: [bank2PubKey] }))
  .then(() => getValue({ iUser: 0, iContract: 2 }))
  .then(() => getValue({ iUser: 2, iContract: 2 }))

  .then(() => setValue({ iUser: 2, iContract: 2, value: 201, privateFor: [auditorPubKey] }))
  .then(() => getValue({ iUser: 0, iContract: 2 }))
  .then(() => getValue({ iUser: 2, iContract: 2 }))

  // call of contract2's method can be send from bank3, but bank3 cannot read the privateState
  .then(() => setValue({ iUser: 3, iContract: 2, value: 300, privateFor: [bank2PubKey, auditorPubKey] }))
  .then(() => getValue({ iUser: 0, iContract: 2 }))
  .then(() => getValue({ iUser: 2, iContract: 2 }))
  .then(() => getValue({ iUser: 3, iContract: 2 })).catch(e => console.log(e.message.split()[0]))
