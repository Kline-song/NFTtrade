const nft_rho = () => {
    return `new nftDataMapCh, nftOwnerListCh, nftLogListCh in {
        nftDataMapCh!({
            "id111": {
                "name": "name111",
                "description": "description111",
                "metadataUrl": "metadataUrl111",
                "coverImgUrl": "coverImgUrl111",
                "creator": "creatorRevAddr111",
                "price": 100
            },
            "id222": {
                "name": "name222",
                "description": Nil,
                "metadataUrl": "metadataUrl222",
                "coverImgUrl": "coverImgUrl222",
                "creator": "creatorRevAddr222",
                "price": -1
            },
        })|
        nftOwnerListCh!([
            ["id111", "RevAddr114"],
            ["id222", "creatorRevAddr222"]
        ])|
        nftLogListCh!([
            ["id111", "", "RevAddr112", 111, "20231113"],
            ["id111", "RevAddr112", "RevAddr114", 111, "20231114"],
            ["id222", "", "creatorRevAddr222", 222, "20231114"]
        ])|
    
        contract @"getNftDataMap"(returnCh) = {
            for (@nftDataMap <- nftDataMapCh) {
                returnCh!(nftDataMap)|
                nftDataMapCh!(nftDataMap)
            }
        }|
    
        contract @"getNftOwnerList"(returnCh) = {
            for (@nftOwnerList <- nftOwnerListCh) {
                returnCh!(nftOwnerList)|
                nftOwnerListCh!(nftOwnerList)
            }
        }|
    
        contract @"getNftLogList"(returnCh) = {
            for (@nftLogList <- nftLogListCh) {
                returnCh!(nftLogList)|
                nftLogListCh!(nftLogList)
            }
        }|
    
        // 根据id获取nftDataMap中对应的数据，包括name, description, metadataUrl, coverImgUrl, creator
        contract @"dataOf"(@id, returnCh) = {
            for (@nftDataMap <- nftDataMapCh) {
                returnCh!(nftDataMap.getOrElse(id, -1))|
                nftDataMapCh!(nftDataMap)
            }
        }|
        
        
         // 获取对应id的description属性
        contract @"getDescription"(@id, returnCh) = {
             for (@nftDataMap <- nftDataMapCh) {
                 returnCh!(nftDataMap.getOrElse(id, {"description": -1}).get("description"))|
                 nftDataMapCh!(nftDataMap)
             }
        }|
    
        // 根据id获取nftOwnerList中对应的数据，包括owner；若id不存在则返回-1
        contract @"ownerOf"(@id, returnCh) = {
            for (@nftOwnerList <- nftOwnerListCh) {
                new loop in {
                    contract loop(@count) = {
                        if (count >= 0) {
                            if (nftOwnerList.nth(count).nth(0) == id) {
                                returnCh!(nftOwnerList.nth(count).nth(1))
                            } else {
                                loop!(count - 1)
                            }
                        } else {
                            returnCh!(-1)
                        }
                    }|
                    loop!(nftOwnerList.length() - 1)
                }|
                nftOwnerListCh!(nftOwnerList)
            }
        }|
    
        // 根据addr获取nftOwnerList中对应的数据，包括id的列表；若addr不存在则无返回值
        contract @"listNftByAddr"(@addr, returnCh) = {
            for (@nftOwnerList <- nftOwnerListCh) {
                new loop in {
                    contract loop(@count) = {
                        if (count >= 0) {
                            if (nftOwnerList.nth(count).nth(1) == addr) {
                                returnCh!(nftOwnerList.nth(count).nth(0))
                            }|
                            loop!(count - 1)
                        } else {
                            Nil
                        }
                    }|
                    loop!(nftOwnerList.length() - 1)
                }|
            nftOwnerListCh!(nftOwnerList)
            }
        }|
    
        // 根据id获取nftLogList中对应的数据，包括{from, to, price, timestamp}的列表；若id不存在则无返回值
        contract @"listNftLogById"(@id, returnCh) = {
            for (@nftLogList <- nftLogListCh) {
                new loop in {
                    contract loop(@count) = {
                        // returnCh!(["loop", count])|
                        if (count >= 0) {
                            if (nftLogList.nth(count).nth(0) == id) {
                                returnCh!(nftLogList.nth(count))
                            }|
                            loop!(count - 1)
                        } else {
                            Nil
                        }
                    }|
                    loop!(nftLogList.length() - 1)
                }|
                nftLogListCh!(nftLogList)
            }
        }|
    
        // 根据addr获取nftLogList中对应的数据，包括{from, to, price, timestamp}的列表；若addr不存在则无返回值
        contract @"listNftLogByAddr"(@addr, returnCh) = {
            for (@nftLogList <- nftLogListCh) {
                new loop in {
                    contract loop(@count) = {
                        // returnCh!(["loop", count])|
                        if (count >= 0) {
                            if (nftLogList.nth(count).nth(1) == addr or nftLogList.nth(count).nth(2) == addr) {
                                returnCh!(nftLogList.nth(count))
                            }|
                            loop!(count - 1)
                        } else {
                            Nil
                        }
                    }|
                    loop!(nftLogList.length() - 1)
                }|
                nftLogListCh!(nftLogList)
            }
        }|
    
        // 根据id获取nftDataMap中对应的数据price；若id不存在则返回-1
        contract @"priceOf"(@id, returnCh) = {
            for (@nftDataMap <- nftDataMapCh) {
                if (nftDataMap.contains(id)) {
                    returnCh!(nftDataMap.get(id).get("price"))
                } else {
                    returnCh!(-1)
                }|
                nftDataMapCh!(nftDataMap)
            }
        }|
    
        // 向nftDataMap插入新数据
        contract @"insertNftData"(@id, @name, @description, @metadataUrl, @coverImgUrl, @creator, @price, returnCh) = {
            for (@nftDataMap <- nftDataMapCh) {
                match(nftDataMap.contains(id)) {
                    true => {
                        // 若id已存在，不能插入，错误码-1
                        returnCh!(-1)|
                        nftDataMapCh!(nftDataMap)
                    }
                    false => {
                        returnCh!(1)|
                        nftDataMapCh!(nftDataMap.union({
                            id: {
                                "name": name,
                                "description": description,
                                "metadataUrl": metadataUrl,
                                "coverImgUrl": coverImgUrl,
                                "creator": creator,
                                "price": price
                            }
                        }))
                    }
                }
            }
        }|
    
        // 向nftOwnerList插入新数据（不检查id是否已存在）
        contract @"insertNftOwner"(@id, @addr, returnCh) = {
            for (@nftOwnerList <- nftOwnerListCh) {
                nftOwnerListCh!(nftOwnerList ++ [[id, addr]])|
                returnCh!(1)
            }
        }|
        
        // 向nftLogList插入新数据
        contract @"insertNftLog"(@id, @from, @to, @price, @timestamp, returnCh) = {
            for (@nftLogList <- nftLogListCh) {
                nftLogListCh!(nftLogList ++ [[id, from, to, price, timestamp]])|
                returnCh!(1)
            }
        }|
    
        // 更新id的owner，若有id数据则更新，返回1；若无id数据则插入，返回2
        contract @"updateNftOwner"(@id, @owner, returnCh) = {
            for (@nftOwnerList <- nftOwnerListCh) {
                new loop in {
                    contract loop(@count) = {
                        if (count >= 0) {
                            if (nftOwnerList.nth(count).nth(0) == id) {
                                // 若找到id对应数据，则更新owner，返回1
                                nftOwnerListCh!(nftOwnerList.slice(0, count) ++ [[id, owner]] ++ nftOwnerList.slice(count + 1, nftOwnerList.length()))|
                                returnCh!(1)
                            } else {
                                loop!(count - 1)
                            }
                        } else {
                            // 若未找到id对应数据，则插入新数据，返回2
                            nftOwnerListCh!(nftOwnerList ++ [[id, owner]])|
                            returnCh!(2)
                        }
                    }|
                    loop!(nftOwnerList.length() - 1)
                }
            }
        }|
    
        // 更新id的price，若无id数据则返回-1
        contract @"updateNftPrice"(@id, @price, returnCh) = {
            for (@nftDataMap <- nftDataMapCh) {
                if (nftDataMap.contains(id)) {
                    nftDataMapCh!(nftDataMap.union({
                        id: nftDataMap.get(id).set("price", price)
                    }))
                } else {
                    returnCh!(-1)|
                    nftDataMapCh!(nftDataMap)
                }
            }
        }|
    
        // 铸造NFT
        contract @"mintNft"(@id, @name, @description, @metadataUrl, @coverImgUrl, @timestamp, returnCh) = {
            new ownerCh in {
                @"ownerOf"!(id, *ownerCh)|
                for (@owner <- ownerCh) {
                    if (owner == -1) {
                        // 若id不存在，可以铸造
                        new deployerRevAddrCh in {
                            // 获取deployerId并计算出对应的REV地址，作为creator的值
                            @"getDeployerRevAddr"!(*deployerRevAddrCh)|
                            for (@deployerRevAddr <- deployerRevAddrCh) {
                                @"insertNftData"!(id, name, description, metadataUrl, coverImgUrl, deployerRevAddr, 0, *returnCh)|
                                @"insertNftOwner"!(id, deployerRevAddr, *returnCh)|
                                @"insertNftLog"!(id, "", deployerRevAddr, 0, timestamp, *returnCh)|
                                returnCh!(200)
                            }
                        }
                    } else {
                        // 若id已存在，不能铸造，错误码-1
                        returnCh!(-1)
                    }
                }
            }
            
            // 获取deployerId并计算出对应的REV地址，作为creator的值记入nftDataMap
        }|
    
        // 转移NFT
        contract @"transferNft"(@id, @from, @timestamp, returnCh) = {
            // 检查id是否出售
            new priceCh in {
                @"priceOf"!(id, *priceCh)|
                for (@price <- priceCh) {
                    if (price <= 0) {
                        // 若价格不大于0，不出售，返回错误码-1
                        returnCh!(-1)
                    } else {
                        // 若出售，检查from是否是NFT的owner
                        new ownerCh in {
                            @"ownerOf"!(id, *ownerCh)|
                            for (@owner <- ownerCh) {
                                if (owner == from) {
                                    // 尝试转账
                                    new transferRevResultCh in {
                                        @"transferRev"!(from, price, *transferRevResultCh)|
                                        for (@transferRevResult <- transferRevResultCh) {
                                            match transferRevResult {
                                                true => {
                                                    // 若转账成功
                                                    new deployerRevAddrCh, resultCh in {
                                                        @"getDeployerRevAddr"!(*deployerRevAddrCh)|
                                                        for (@deployerRevAddr <- deployerRevAddrCh) {
                                                            @"updateNftOwner"!(id, deployerRevAddr, *resultCh)|
                                                            @"updateNftPrice"!(id, -1, *resultCh)|
                                                            @"insertNftLog"!(id, from, deployerRevAddr, price, timestamp, *resultCh)|
                                                            returnCh!(200)
                                                        }
                                                    }
                                                }
                                                false => {
                                                    // 若转账失败，返回错误码-3
                                                    returnCh!(-3)
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    // 若不是则返回错误码-2
                                    returnCh!(-2)
                                }
                            }
                        }
                    }
                }
            }
            
        }|
        
        contract @"getDeployerRevAddr"(returnCh) = {
            new RevAddress(\`rho:rev:address\`), 
                DeployerIdOps(\`rho:rchain:deployerId:ops\`),
                deployerId(\`rho:rchain:deployerId\`),
                revAddrCh, deployerPubKeyBytesCh
            in {
                DeployerIdOps!("pubKeyBytes", *deployerId, *deployerPubKeyBytesCh) |
                for (@deployerPubKeyBytes <- deployerPubKeyBytesCh) {
                    RevAddress!("fromPublicKey", deployerPubKeyBytes, *revAddrCh) |
                    for (@deployerRevAddress <- revAddrCh) {
                        returnCh!(deployerRevAddress)
                    }
                }
            }  
        }|
    
        contract @"transferRev"(@to, @amount, returnCh) = {
            new fromCh in {
                // 获取deployer REV地址，作为转账发起方
                @"getDeployerRevAddr"!(*fromCh)|
                for (@from <- fromCh) {
                    new rl(\`rho:registry:lookup\`), RevVaultCh in {
                        rl!(\`rho:rchain:revVault\`, *RevVaultCh)
                        |
                        for (@(_, RevVault) <- RevVaultCh) {
                            new vaultCh, revVaultkeyCh, deployerId(\`rho:rchain:deployerId\`) in {
                                @RevVault!("findOrCreate", from, *vaultCh)
                                |
                                @RevVault!("deployerAuthKey", *deployerId, *revVaultkeyCh)
                                |
                                for (@(true, vault) <- vaultCh; key <- revVaultkeyCh) {
                                    @vault!("transfer", to, amount, *key, *returnCh)
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;
} 

const getNftDataMap_rho = () => {
    return `new returnCh in {@"getNftDataMap"!(*returnCh)}`;
}

const dataOf_rho = (id) => {
    return `new returnCh in {
        @"dataOf"!("${id}", *returnCh)
    }`;
}

const ownerOf_rho = (id) => {
    return `new returnCh in {
        @"ownerOf"!("${id}", *returnCh)
    }`;
}

const priceOf_rho = (id) => {
    return `new returnCh in {
        @"priceOf"!("${id}", *returnCh)
    }`;
}

const listNftByAddr_rho = (addr) => {
    return `new returnCh in {
        @"listNftByAddr"!("${addr}", *returnCh)
    }`;
}

const listNftLogByAddr_rho = (addr) => {
    return `new returnCh in {
        @"listNftLogByAddr"!("${addr}", *returnCh)
    }`;
}

const getDeployerRevAddr_rho = () => {
    return `new returnCh in {
        @"getDeployerRevAddr"!(*returnCh)
    }`;
}

const mint_rho = (id, name, description, metadataUrl, coverImgUrl, timestamp) => {
    return `new returnCh in {
        @"mintNft"!("${id}", "${name}", "${description}", "${metadataUrl}", "${coverImgUrl}", "${timestamp}", *returnCh)
    }`;
}

const getDescription_rho = (id) => {
    return `new returnCh in {
        @"getDescription"!("${id}", *returnCh)
    }`;
}



module.exports = {
    nft_rho,
    getNftDataMap_rho,
    dataOf_rho,
    ownerOf_rho,
    priceOf_rho,
    listNftByAddr_rho,
    listNftLogByAddr_rho,
    getDeployerRevAddr_rho,
    mint_rho,
    getDescription_rho,

};