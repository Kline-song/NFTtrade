const contractDeployer = require('../middlewares/contractDeployer');
const nftBalancesRho = require('../contracts/nftBalancesRho');
const nftFactoryRho = require('../contracts/nftFactoryRho');

async function init() {
    // 部署合约所用私钥
    const PRIVATE_KEY = '28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36';
    // 从文件读取合约并部署
    // const NFT_BALANCES_FILEPATH = '../contracts/nftBalances.rho';
    // const NFT_FACTORY_FILEPATH = '../contracts/nftFactory.rho';
    // var nftBalancesRho = fs.readFileSync(NFT_BALANCES_FILEPATH, 'utf8');
    // var nftFactoryRho = fs.readFileSync(NFT_FACTORY_FILEPATH, 'utf8');
    var names = await contractDeployer.deploy(PRIVATE_KEY, nftBalancesRho, 1);
    // var balancesName = names[0];
    await contractDeployer.deploy(PRIVATE_KEY, nftFactoryRho, 1);
    return new Promise((resolve) => {
        resolve();
    });
}

async function getBalances() {
    // 部署合约所用私钥
    const PRIVATE_KEY = '28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36';
    // 合约内容
    const term = 
    `new returnCh in {
        @"getBalances"!(*returnCh)
    }`;
    // 部署合约，获取数据dataAtNameResponse
    var names = await contractDeployer.deploy(PRIVATE_KEY, term, 1);
    balancesName = names[0];
    var dataAtNameResponse = await contractDeployer.getDataAtName(balancesName);
    // 从dataAtNameResponse中获取结果
    return new Promise((resolve) => {
        var exprs = JSON.parse(dataAtNameResponse)["exprs"];
        var len = exprs.length;
        var expr = exprs[len - 1]["expr"];
        var data = expr.ExprMap.data;

        var balances = [];
        var keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            var key = keys[i];
            // console.log(key);
            var nftOwn = {};
            nftOwn[key] = data[key].ExprString.data;
            // console.log(nftOwn);
            balances.push(nftOwn);
        }
        console.log(balances);
        resolve(balances);
    });
}

async function mint(id, name, description, uri, owner) {
    // 部署合约所用私钥
    const PRIVATE_KEY = '28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36';
    // 合约内容
    const term = 
    `new returnCh, mint in {
        @"nftFactory"!(\"${id}\", \"${name}\", \"${description}\", \"${uri}\", *mint)|
        mint!(\"${owner}\", *returnCh)
    }`;

    // 部署合约，获取数据dataAtNameResponse
    var names = await contractDeployer.deploy(PRIVATE_KEY, term, 2);
    var dataAtNameResponse = await contractDeployer.getDataAtName(names[0]);

    // 从dataAtNameResponse中获取结果
    return new Promise((resolve) => {
        var exprs = JSON.parse(dataAtNameResponse)["exprs"];
        var expr = exprs[0]["expr"];
        var data = expr.ExprInt.data;
        resolve(data);
    });
}

async function transfer(id, from, to) {
    // 部署合约所用私钥
    const PRIVATE_KEY = '28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36';
    // 合约内容
    const term = 
    `new returnCh in {
        @"transfer"!(\"${id}\", \"${from}\", \"${to}\", *returnCh)
    }`;

    // 部署合约，获取数据dataAtNameResponse
    var names = await contractDeployer.deploy(PRIVATE_KEY, term, 1);
    var dataAtNameResponse = await contractDeployer.getDataAtName(names[0]);

    // 从dataAtNameResponse中获取结果
    return new Promise((resolve) => {
        var exprs = JSON.parse(dataAtNameResponse)["exprs"];
        var expr = exprs[0]["expr"];
        var data = expr.ExprInt.data;
        resolve(data);
    });
}

module.exports = {
    init,
    getBalances,
    mint, 
    transfer
}