const nft = require('../contract/nft');
const rchainManager = require("../manager/rchainManager");

async function priceOf_rho(privateKey, id) {
    const term = nft.priceOf_rho(id);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName(`localhost`, names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}

async function insertNftLog_rho(privateKey, id, from, to, price, timestamp) {
    const term = nft.insertNftLog_rho(id, from, to, price, timestamp);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName(`localhost`, names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}


async function transferNft_rho(privateKey, id, timestamp) {
    const term = nft.transferNft_rho(id, timestamp);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName('localhost', names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}

async function dataOf_rho(privateKey, id) {
    const term = nft.dataOf_rho(id);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName(`localhost`, names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}

async function listNftLogByAddr_rho(privateKey, addr) {
    const term = nft.listNftLogByAddr_rho(addr);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName('localhost', names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}

async function transferRev_rho(privateKey, to, amount) {
    const term = nft.transferRev_rho(to, amount);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName('localhost', names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}
async function ownerOf_rho(privateKey, id) {
    const term = nft.ownerOf_rho(id);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName('localhost', names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}
async function updateNftPrice_rho(privateKey, id, price) {
    const term = nft.updateNftPrice_rho(id, price);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName('localhost', names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}
module.exports = {
    priceOf_rho,
    insertNftLog_rho,
    transferNft_rho,
    dataOf_rho,
    listNftLogByAddr_rho,
    transferRev_rho,
    ownerOf_rho,
    listNftLogByAddr_rho,
    updateNftPrice_rho,
};


