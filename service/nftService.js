const nft = require('../contract/nft');
const rchainManager = require("../manager/rchainManager");

async function mint(privateKey, nft_id, name, description, metadataUrl, coverImageUrl) {
    const term = nft.mint_rho(nft_id, name, description, metadataUrl, coverImageUrl, "20231117");
    var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
    var data = await rchainManager.getDataAtName(names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}



//通过id查询商品详情
async function getDescription(privateKey,nft_id){
    const term = nft.getDescription_rho(nft_id);
    var names = await rchainManager.deploy('localhost',privateKey,term,1,1000000000);
    var data = await  rchainManager.getDataAtName(`localhost`, names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        console.log(data);
        resolve(data);
    })
}

//通过地址查询某人持有的所有nft信息
async function listNftByAddr(privateKey,addr){
    const term = nft.listNftByAddr_rho(addr);
    var names = await rchainManager.deploy('localhost',privateKey,term,1,1000000000);
    var data = await  rchainManager.getDataAtName(`localhost`,names[0]);
    return new Promise((resolve) => {
        data = rchainManager.convertRChainData(data);
        //console.log(data);
        resolve(data);
    })
}




module.exports = {
    mint,
    getDescription,
    listNftByAddr,


};