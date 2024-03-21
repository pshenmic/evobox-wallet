import {describe, it, before} from 'node:test';
import createAssetLockTransaction from "../../src/api/utils/createAssetLockTransaction";
import {Networks, PrivateKey, Script, Transaction} from "../../../dashcore-lib";

describe('creatAssetLockTransaction.spec.js', () => {
    let client

    before(async () => {
    })

    it('should create an assetlock transaction', async () => {
        const network = Networks.testnet;

        const utxos = [{
            txid: "71ba6cad665f9b65ea036cfc3d0c16ee6a5009c537e9567a70ff7f7db65ff740",
            vout: 1,
            script: Script.fromHex("76a9147b6f195828b3a2298ccc3f3d237267bdd6280d0b88ac"),
            satoshis: 1000
        }].map(e => Transaction.UnspentOutput.fromObject(e))

        const signingKeys = [PrivateKey.fromRandom(network)]

        const transaction = await createAssetLockTransaction(
            {
                inputs: utxos,
                signingKeys,
                fundingAmount: 1000,
                network
            })
        console.log(transaction)
    });
});
