import {Builder} from "./Builder";
import createAssetLockTransaction from "./utils/createAssetLockTransaction";
import {Networks, PrivateKey, Script, Transaction} from "@dashevo/dashcore-lib";
import {DashSight} from "dashsight";

export class DashPlatformApi {

    constructor() {
        this.network = Networks.testnet
        this.dashsight = DashSight.create({
            dashsightBaseUrl: "http://insight.testnet.networks.dash.org:3001/insight-api",
            dashsocketBaseUrl: "http://insight.testnet.networks.dash.org:3001/socket.io",
            insightBaseUrl: "http://insight.testnet.networks.dash.org:3001/insight-api",
        });
        this.init().catch(console.error)
    }

    async init() {
        // init
    }

    /**
     * Returns next unused address from the wallet
     */
    async builder() {
        return new Builder()
    }

    async registerIdentity() {
        const utxos = await this.dashsight.getUtxos('yXa746JEetLvTtdLFfNTtJ2z5dtzHsiieG')
        const privateKey = PrivateKey.fromString('cNNQJt1dDVRN4dQ1emY64i2sBFCZ7bsvC7fx8HQetQbD54H4416u')

        const assetLockTransaction = await createAssetLockTransaction(
            {
                inputs: utxos,
                signingKeys: [privateKey],
                fundingAmount: 1000,
                network: this.network
            })

        console.log(assetLockTransaction)

        // todo acquireInstantLockOrChainlock
        // todo create assetLockProof
        // todo create registerIdentity
    }

    submitDocument(data) {

    }


    setIdentity(identifier) {

    }
}



