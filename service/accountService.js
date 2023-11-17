const rchainManager = require("../manager/rchainManager");

async function checkBalance(revAddr) {
    const checkBalance = require("../contract/checkBalance");
    const term = checkBalance(revAddr);
    var balance = await rchainManager.exploreDeploy(`localhost`, 40413, term);
    // console.log(balance);
    return new Promise((resolve) => {
        balance = rchainManager.convertRChainData(balance.expr);
        balance = balance[0];
        resolve(balance);
    });
}

// async function checkBalance(revAddr) {
//     const checkBalance = require("../contract/checkBalance");
//     const term = checkBalance(revAddr);
//     var names = await rchainManager.deploy(`localhost`, "e87979632701ee11a669cf6a0c2235c3721dccb611325f8b481cfbbd60fc91be", term, 1, 100000000);
//     var balance = await rchainManager.getDataAtName(names[0]);
//     return new Promise((resolve) => {
//         balance = rchainManager.convertRChainData(balance);
//         resolve(balance);
//     });
// }

async function transferRev(privateKey, toRevAddr, amount) {
    // 输出：true / false
    const transferRev = require("../contract/transferRev");
    const term = transferRev(toRevAddr, amount);
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var result = await rchainManager.getDataAtName(`localhost`, names[0]);
    console.log(result);
    return new Promise((resolve) => {
        result = rchainManager.convertRChainData(result);
        resolve(result[0]);
    });
}

module.exports = {
    checkBalance,
    transferRev
}