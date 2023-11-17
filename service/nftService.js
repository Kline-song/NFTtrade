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

module.exports = {
    mint
};