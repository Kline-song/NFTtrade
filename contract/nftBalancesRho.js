const nftBalancesRho = `
new balancesCh in {
    // 初始数据
    balancesCh!({"id1": "owner11", "id2": "owner12"})|

    // public 查询所有余额
    contract @"getBalances"(returnCh) = {
        for (@balances <- balancesCh) {
            returnCh!(balances)|
            balancesCh!(balances)
        }
    }|

    // public 查询指定id的owner，若不存在id也返回0
    contract @"ownerOf"(@id, returnCh) = {
        for (@balances <- balancesCh) {
            // stdout!(balances.getOrElse(id, {}).getOrElse(owner, 0))|
            returnCh!(balances.getOrElse(id, 0))|
            balancesCh!(balances)
        }
    }|
    
    // private 铸造，向balances增加新map
    contract @"mint"(@id, @to, returnCh) = {
        //stdout!(["mint", to, id])|

        for (@balances <- balancesCh) {
            match (balances.contains(id)) {
                true => {
                    // 若id已存在，不能铸造，错误码-1
                    returnCh!(-1)|
                    balancesCh!(balances)
                }
                false => {
                    // 若id不存在，向balances中增加map
                    returnCh!(1)|
                    balancesCh!(balances.union({id: to}))
                }
            }
        }
    }|

    // private 销毁
    contract @"burn"(@id, @from, returnCh) = {
        //stdout!(["burn", from, id])|

        for (@balances <- balancesCh) {
            returnCh!(1)|
            balancesCh!(balances.diff({id: from}))
        }
    }|

    // private 转移，从from转移id到to
    contract @"transfer"(@id, @from, @to, returnCh) = {
        //stdout!(["transfer", from, to, id])|

        new ownerCh in {
            @"ownerOf"!(id, *ownerCh)|
            for (@owner <- ownerCh) {
                match (owner == 0) {
                    true => {
                        // 若from未持有NFT（可能是NFT不存在或NFT不属于from），不能转移，错误码-1
                        returnCh!(-1)
                    }
                    false => {
                        // 若from持有待转移的NFT（说明id存在、from存在）
                        for (@balances <- balancesCh) {
                            balancesCh!(balances.set(id, to))|
                            returnCh!(1)
                        }
                    }
                }
            }
        }
    }
}
`;

module.exports = nftBalancesRho;