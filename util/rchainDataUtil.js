function convertRChainData(rchainData) {
    // 输入：从RChain接口返回的数据对象（已完成JSON反序列化转变为JS对象）
    /*
    例如：
    "ExprMap": {
        "data": {
            "name": {
                "ExprString": {
                    "data": "name111"
                }
            },
            "description": {
                "ExprString": {
                    "data": "description111"
                }
            },
            "price": {
                "ExprInt": {
                    "data": 100
                }
            },
            "creator": {
                "ExprString": {
                    "data": "creatorRevAddr111"
                }
            },
            "metadataUrl": {
                "ExprString": {
                    "data": "metadataUrl111"
                }
            },
            "coverImgUrl": {
                "ExprString": {
                    "data": "coverImgUrl111"
                }
            }
        }
    }
    */
    // 输出：转化得到的JS对象
    /*
    例如：
    {
        name: 'name111',
        description: 'description111',
        price: 100,
        creator: 'creatorRevAddr111',
        metadataUrl: 'metadataUrl111',
        coverImgUrl: 'coverImgUrl111'
    }
    */
    var obj = rchainData;
    for (let key1 in obj) {
        // console.log("key:", key1);
        if (key1 == "exprs") {
            return convertRChainData(obj.exprs[0].expr);
        } else if (key1 == "expr") {
            return convertRChainData(obj.expr);
        } else if (key1 == "ExprMap") {
            obj = obj.ExprMap.data;
            for (let key2 in obj) {
                obj[key2] = convertRChainData(obj[key2]);
            }
            return obj;

        } else if (key1 == "ExprTuple" || key1 == "ExprPar" || key1 == "ExprList") {

            return convertRChainData(obj[key1].data);
        } else if (key1.startsWith("Expr")) {
            return obj[key1].data;
        } else if (Number.isInteger(parseInt(key1))) {
            // 意味着输入的rchainData是Array/List
            var list = [];
            for (let i = 0; i < obj.length; i++) {
                list.push(convertRChainData(obj[i]));
            }
            return list;
        } else {
            return obj[key1];
        }
    }
}

module.exports = {
    convertRChainData
};