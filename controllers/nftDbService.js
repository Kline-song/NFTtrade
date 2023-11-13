const Nft = require('../models/nft');
const NftOwn = require('../models/nftOwn');
const NftLog = require('../models/nftLog');

async function isExistingNft(nft_id) {
    try {
        var nft = await Nft.findById(nft_id);
        return new Promise((resolve) => {
            if (nft == undefined || nft == null) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    } catch (error) {
        throw error;
    }
}

async function isExistingNftOwn(nft_id, owner_id) {
    try {
        var nftOwn = await NftOwn.findByNftIdAndOwnerId(nft_id, owner_id);
        return new Promise((resolve) => {
            if (nftOwn == undefined || nftOwn == null) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    } catch (error) {
        throw error;
    }
}

async function mint(nft_id, name, description, uri, owner_id) {
    // 向数据库插入新数据，返回true

    // 数据
    var nft = {
        nft_id: nft_id,
        name: name,
        description: description,
        uri: uri
    };
    var nftOwn = {
        nft_id: nft_id,
        owner_id: owner_id
    };
    var nftLog = {
        nft_id: nft_id,
        to_id: owner_id
    };
    
    // 插入数据库
    try {
        await Nft.save(nft);
        await NftOwn.save(nftOwn);
        await NftLog.save(nftLog);
        // TODO 异常处理
        return new Promise((resolve) => {
            resolve(true);
        });
    } catch (error) {
        throw error;
    }

}

async function transfer(nft_id, from_id, to_id) {
    // 更新数据库，返回true
    try {
        await NftOwn.updateOwnerIdByNftIdAndOwnerId(nft_id, from_id, to_id);
        // NFT流转记录
        var nftLog = {
            nft_id: nft_id,
            from_id: from_id,
            to_id: to_id
        };
        await NftLog.save(nftLog);
        // TODO 异常处理
        return new Promise((resolve) => {
            resolve(true);
        });
    } catch (error) {
        throw error;
    }

}

module.exports = {
    isExistingNft,
    isExistingNftOwn,
    mint,
    transfer
};