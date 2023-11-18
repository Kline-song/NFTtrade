const rchainManager = require("../manager/rchainManager");
const nft = require('../contract/nft');
const orderService = require('../service/orderService');
const accountService = require('../service/accountService');
const { Expr } = require("@fabcotech/rchain-toolkit/dist/rnode-protos");
const { rmSync } = require("fs");

const PRIVATE_KEY_1 = '28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36';
const REV_ADDR_1 = "1111Wbd8KLeWBVsxByF9iksJ4QRRjEF3nq1ScgAw7bMbtomxHsqqd";
const PRIVATE_KEY_2 = "e87979632701ee11a669cf6a0c2235c3721dccb611325f8b481cfbbd60fc91be";
const REV_ADDR_2 = "1111ug1DpMyyJmViPgV6j1NrUzyjixbFSwwpMfqYHsu8RJq2BnxL8";

// async function test() {
    
//     var names = await rchainManager.deploy(`localhost`, PRIVATE_KEY_1, nft.getNftDataMap_rho(), 1, 10000);
//     var data = await rchainManager.getDataAtName(`localhost`, names[0]);
//     console.log("data:", data);
//     console.log(rchainManager.convertRChainData(data));
// }

// const accountService = require("../service/accountService");
// const { privateKey } = require("@fabcotech/rchain-toolkit/dist/models");
// async function testCheckBalance() {
    
//     var balance = await accountService.checkBalance(REV_ADDR_1);
//     console.log("balance:", balance);
// }
// async function testTransferRev() {
//     var result = await accountService.transferRev(PRIVATE_KEY_1, "1111212iFduAMTPf26BnEsQ4nBw7mjUtkPUH6qVmiJD9YtRHhHFnQs", 10000000);
//     console.log(result); // true/false
// }

// // test();
// async function testNft(){
//     const term = nft.nft_rho();
//     await rchainManager.deploy(`localhost`, PRIVATE_KEY_1, term, 4, 100000000);
// }

async function test1(){
    var result = await orderService.listNftLogByAddr_rho(PRIVATE_KEY_1,"1111212iFduAMTPf26BnEsQ4nBw7mjUtkPUH6qVmiJD9YtRHhHFnQs");

    
    console.log(result[0]);
}
// testCheckBalance();
// // testTransferRev();
// testNft();
test1()