const rchainManager = require("../manager/rchainManager");
const nft = require('../contract/nft');
const nftService = require('../service/nftService.js');

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

async function testNft(){
    const term = nft.nft_rho();
    await rchainManager.deploy(`localhost`, PRIVATE_KEY_1, term, 4, 100000000);
}
// test();
// testCheckBalance();
testNft();
// testTransferRev();
async function test1() {
    const nftsForSale = await nftService.listNftsForSale();

    if (!nftsForSale || Object.keys(nftsForSale).length === 0) {
        console.log("No NFT data found");
        return;
    }

    let products = Object.keys(nftsForSale).map(key => {
        const nft = nftsForSale[key];
        return {
            product_id: key,
            name: nft.name,
            description: nft.description,
            metadataUrl: nft.metadataUrl,
            coverImgUrl: nft.coverImgUrl,
            creator: nft.creator,
            price: nft.price,
        };
    });

    console.log(products);
}



test1();
