const express = require("express");
const router = express.Router();
const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(process.cwd(), 'HLF-SDK', 'connection_config.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);
const walletPath = path.join(process.cwd(), 'wallet');
const wallet = new FileSystemWallet(walletPath);
const gateway = new Gateway();



const db = require("../mysql/con");

query = async (id) => {
    try {
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('mydid');
        const result = await contract.evaluateTransaction('query', id);
        return result.toString;
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
    }
}

insert = async (id, key) => {
    try {
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('mydid');
        const result = await contract.evaluateTransaction('insert', id, key);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
    }
}

changepk = async (id, key) => {
    try {
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('mydid');
        const result = await contract.evaluateTransaction('changepk', id, key);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
    }
}

deleteid = async (id) => {
    try {
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('mydid');
        const result = await contract.evaluateTransaction('delete', id);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
    }
}



router.post('/query', (req, res) => {
    //user 검증
})
router.post('/insert', (req, res) => {

})
router.post('/chagepk', (req, res) => {

})
router.post('/delete', (req, res) => {

})
module.exports = router;