const nftRChainService = require('./nftRChainService');

var initFlag = false;
async function init(req, res, next) {
    if (initFlag == false) {
        await nftRChainService.init();
        initFlag = true;
        res.send("RChain is initialized!");
    } else {
        res.send("RChain has already been initialized!")
    }
}

async function getBalances(req, res, next) {
    var balances = await nftRChainService.getBalances();
    res.send(balances);
}

module.exports = {
    init,
    getBalances
};