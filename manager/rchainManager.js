const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const rchainToolkit = require('@fabcotech/rchain-toolkit');
const rchainToolkit_grpc = require('@fabcotech/rchain-toolkit/dist/grpc.js');
const rchainHttp = require("./rchainHttp");
const rchainUtil = require("./rchainUtil");

const READ_ONLY_HOST = 'localhost';
const VALIDATOR_HOST = 'localhost';
const SHARD_ID = 'root';

async function deploy(validatorHost, privateKey, term, nameQty, phloLimit) {
    const PRIVATE_KEY = privateKey;
    const PUBLIC_KEY = rchainToolkit.utils.publicKeyFromPrivateKey(PRIVATE_KEY); // 直接获取公钥
    
    
    // 获取当前时间戳
    const _timestamp = new Date().valueOf();

    const grpcClient = await rchainToolkit_grpc.getGrpcProposeClient(
        VALIDATOR_HOST + ":40402",
        grpc,
        protoLoader
    );

    // deploy准备
    const pd = await rchainToolkit.http.prepareDeploy(
        'http://' + VALIDATOR_HOST + ':40403',
        {
            deployer: PUBLIC_KEY,
            timestamp: _timestamp,
            nameQty: nameQty
        }
    );
    console.log('Prepare to deploy...');
    // console.log(pd + '\n');

    // 读取智能合约文件内容
    const _term = term;
    // 获取当前最后一个区块的编号
    const _validAfterBlockNumber = await rchainToolkit.http.validAfterBlockNumber(
        "http://" + VALIDATOR_HOST + ":40403"
    );
    // 设置deploy选项
    const deployOptions = rchainToolkit.utils.getDeployOptions(
        {
            timestamp: _timestamp,
            term: _term,
            shardId: SHARD_ID,
            privateKey: PRIVATE_KEY,
            phloPrice: 1,
            phloLimit: phloLimit,
            validAfterBlockNumber: _validAfterBlockNumber || -1
        }
    );

    // 获取deploy返回结果
    let deployResponse;
    try {
        deployResponse = await rchainToolkit.http.deploy(
            "http://" + VALIDATOR_HOST + ":40403",
            deployOptions
        );
        console.log('deployResponse:');
        console.log(deployResponse + '\n');
    } catch (err) {
        console.log(err);
    }
    
    // 获取propose返回结果
    let proposeResponse;
    try {
        proposeResponse = await rchainToolkit_grpc.propose({}, grpcClient);
        console.log("Propose Response:");
        console.log(proposeResponse);
    } catch (err) {
        console.log(err);
    }

    return new Promise((resolve) => {
        // 等待（for proposing）
        setTimeout(resolve, 5000);
        resolve(JSON.parse(pd).names);
    });
}

async function getDataAtName(validatorHost, name) {
    const unforgeableName = name;

    const dataAtNameResponse = await rchainToolkit.http.dataAtName(
        "http://" + VALIDATOR_HOST + ":40403",
        {
            name: {
                UnforgPrivate: { data: unforgeableName }
            },
            depth: 50
        }
    );

    // console.log(dataAtNameResponse);
    return new Promise((resolve) => {
        data = JSON.parse(dataAtNameResponse);
        resolve(data);
    });
}

async function exploreDeploy(readOnlyHost, port, term) {
    return rchainHttp.exploreDeploy(READ_ONLY_HOST, 40413, term);
}

function convertRChainData(rchainData) {
    return rchainUtil.convertRChainData(rchainData);
}

module.exports = {
    exploreDeploy,
    deploy,
    getDataAtName,
    convertRChainData
};