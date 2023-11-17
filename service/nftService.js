const nft = require('../contract/nft');
const rchainManager = require("../manager/rchainManager");

async function mint(privateKey, nft_id, name, description, metadataUrl, coverImageUrl) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const term = nft.mint_rho(nft_id, name, description, metadataUrl, coverImageUrl, timestamp);

    try {
        var names = await rchainManager.deploy(`localhost`, privateKey, term, 1, 100000000);
        var data = await rchainManager.getDataAtName(names[0]);
        data = rchainManager.convertRChainData(data);
        console.log(data);
        return data; 
    } catch (error) {
        console.error("Error in minting NFT:", error);
        throw new Error("Minting failed"); // 错误处理
    }
}

async function listNftsForSale() {
    const term = nft.getNftDataMap_rho();
    try {
        var names = await rchainManager.deploy(`localhost`, '28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36', term, 1, 100000000);
        var data = await rchainManager.getDataAtName(`localhost`, names[0]);
        data = rchainManager.convertRChainData(data);  // 使用提供的函数转换数据

        const nftsForSale = Object.entries(data).reduce((acc, [id, nftDetails]) => {
            if (nftDetails.price > 0) {
                acc[id] = nftDetails;
            }
            return acc;
        }, {});
        console.log(nftsForSale);
        return nftsForSale; // 直接返回筛选后的 NFT 数据
    } catch (error) {
        console.error("Error in listing NFTs for sale:", error);
        throw new Error("Listing failed"); // 错误处理
    }
}



module.exports = {
    mint,
    listNftsForSale,
};