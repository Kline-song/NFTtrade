const nftDbService = require('./nftDbService');
const nftRChainService = require('./nftRChainService');

function hash(str) {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    const randomBias = parseInt(Math.random() * 100); // 随机偏移量[0, 100)
    var newStr = str + randomBias;
    // console.log(newStr);
    hash.update(newStr);
    return hash.digest('hex').substring(0, 32); // 64位16进制数，取前32位
}

async function generateNftId(name, description, uri, owner_id) {
    // 生成NFT ID，确保唯一性
    var str = name + description + uri;
    var nft_id = null;
    var nftExistingFlag = true;
    do {
        nft_id = hash(str);
        nftExistingFlag = await nftDbService.isExistingNft(nft_id);
    } while (nftExistingFlag);
    return new Promise((resolve) => {
        resolve(nft_id);
    });
}

const nftService = {
    mint: async function (name, description, uri, owner) {

        var nft_id = await generateNftId(name, description, uri, owner);
    
        var rchainResult = await nftRChainService.mint(nft_id, name, description, uri, owner);
        // TODO 异常处理
        var dbResult = await nftDbService.mint(nft_id, name, description, uri, owner);
        // TODO 异常处理
        return new Promise((resolve) => {
            resolve(nft_id);
        });
    },

    transfer: async function (nft_id, from_id, to_id) {
        // 检查NFT是否存在
        var nftExistingFlag = await nftDbService.isExistingNft(nft_id);
        if (!nftExistingFlag) {
            // 若不存在，不能流转，返回false
            return new Promise((resolve) => {
                resolve(false);
            });
        } else {
            // 若存在，检查from_id是否持有该NFT
            var nftOwnExistingFlag = await nftDbService.isExistingNftOwn(nft_id, from_id);
            if (!nftOwnExistingFlag) {
                // 若不持有，不能流转，返回false
                return new Promise((resolve) => {
                    resolve(false);
                });
            } else {
                // 若持有，更新数据库，返回true
                await nftDbService.transfer(nft_id, from_id, to_id);
                await nftRChainService.transfer(nft_id, from_id, to_id);
    
                return new Promise((resolve) => {
                    resolve(true);
                });
            }
        }
    }
}

module.exports = nftService;