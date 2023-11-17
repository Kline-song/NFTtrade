const rchainManager = require("../manager/rchainManager");
const nft = require('../contract/nft');

const PRIVATE_KEY_1 = '28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36';
const REV_ADDR_1 = "1111Wbd8KLeWBVsxByF9iksJ4QRRjEF3nq1ScgAw7bMbtomxHsqqd";
const PRIVATE_KEY_2 = "e87979632701ee11a669cf6a0c2235c3721dccb611325f8b481cfbbd60fc91be";
const REV_ADDR_2 = "1111ug1DpMyyJmViPgV6j1NrUzyjixbFSwwpMfqYHsu8RJq2BnxL8";

async function test() {
    
    var names = await rchainManager.deploy(`localhost`, PRIVATE_KEY_1, nft.getNftDataMap_rho(), 1, 10000);
    var data = await rchainManager.getDataAtName(`localhost`, names[0]);
    console.log("data:", data);
    console.log(rchainManager.convertRChainData(data));
}

const accountService = require("../service/accountService");
async function testCheckBalance() {
    
    var balance = await accountService.checkBalance(REV_ADDR_1);
    console.log("balance:", balance);
}
async function testTransferRev() {
    var result = await accountService.transferRev(PRIVATE_KEY_1, REV_ADDR_2, 10000000);
    console.log(result); // true/false
}

// test();
// testCheckBalance();
testTransferRev();