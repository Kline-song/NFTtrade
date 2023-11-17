const transferRev = (to, amount) => {
    return `new returnCh in {
        @"transferRev"!("${to}", ${amount}, *returnCh)
    }`;
};

module.exports = transferRev;