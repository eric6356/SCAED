import { Meteor } from 'meteor/meteor'
import Web3 from 'web3'

const tmPubKeys = [
  'BULeR8JyUWhiuuCMU/HLA0Q5pzkYT+cHII3ZKBey3Bo=',
  'QfeDAys9MPDs2XHExtc84jKGHxZg/aj52DTh0vtA3Xc=',
  'oNspPPgszVUFw0qmGFfWwh1uxVUXgvBxleXORHj07g8=',
  'R56gy4dn24YOjwyesTczYa8m5xhP6hF2uTMCju/1xkY=',
  'UfNSeSGySeKg11DVNEnqrUtxYRVor4+CvluI8tVv62Y='
]
const auditorPubKey = tmPubKeys[0]

const web3s = [1, 2, 3, 4, 5].map(i => new Web3(`http://localhost:2200${i}`))
const contractAddrs = [
  null,
  '0x4eA2702A084baA5739Ac51a485a4FFEE617d5D3B',
  '0xF6D52ffFD88ba7188A7F06BE4B636Bc650a50945',
  '0x721650D027d87Cd247A3a776C4B6170bf1E5B936'
]

const getContract = ({ iUser, iContract }) => {
  if (!Meteor.isServer) {
    return
  }
  const abi = JSON.parse(`[{"constant":true,"inputs":[],"name":"storedData","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"initVal","type":"uint256"}],"name":"simplestorage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]`)

  const web3 = web3s[iUser]
  const address = contractAddrs[iContract]
  const contract = new web3.eth.Contract(abi, address)
  return web3.eth.getCoinbase().then(coinbase => {
    contract.options.from = coinbase
    return contract
  })
}

Meteor.methods({
  'simpleStorage.get' ({ bank, iContract }) {
    if (!Meteor.isServer) {
      return
    }
    return getContract({ iUser: bank, iContract })
      .then(i => i.methods.get().call())
  },

  'simpleStorage.set' ({ bank, iContract, value }) {
    if (!Meteor.isServer) {
      return
    }
    return getContract({ iUser: bank, iContract })
      .then(i => i.methods.set(value).send({ privateFor: [auditorPubKey] }))
  }
})
