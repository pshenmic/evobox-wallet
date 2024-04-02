import {DashSight} from "dashsight";
import {Networks} from "@dashevo/dashcore-lib";
import {Wallet} from "./Wallet";

export class PlatformLinkSDK {
    constructor({seedPhrase}) {
        this.wallet = new Wallet({seedPhrase, sdk: this})
        this.network = Networks.testnet
        this.dashsight = DashSight.create({
            dashsightBaseUrl: "http://insight.testnet.networks.dash.org:3001/insight-api",
            dashsocketBaseUrl: "http://insight.testnet.networks.dash.org:3001/socket.io",
            insightBaseUrl: "http://insight.testnet.networks.dash.org:3001/insight-api",
        });
    }

    async sync() {
        await this.wallet.init()
    }

    /**
     * Returns next unused address from the wallet
     */
    async getBalance(address) {
        const balance = await this.dashsight.getInstantBalance(address)

        return balance.balance;
    }

    /**
     * Returns next unused address from the wallet
     */
    async getUTXOs(address) {
        const utxos = await this.dashsight.getUtxos(address)

        return utxos;
    }


    /**
     * Returns next unused address from the wallet
     */
    async getTransactions(address) {
        const txs = await this.dashsight.getTxs(address)

        return txs;
    }

    /**
     * Returns next unused address from the wallet
     */
    async generateAddress() {
        return this.wallet.getReceivingAddress()
    }
}



