import {Networks} from "@dashevo/dashcore-lib";
import {DashSight} from "dashsight";
import {Wallet} from "./Wallet";

export class PlatformLinkSDK {
    constructor({seedPhrase = null} = {}) {
        this.wallet = new Wallet({seedPhrase})
        this.network = Networks.testnet
        this.dashsight = DashSight.create({
            dashsightBaseUrl: "http://insight.testnet.networks.dash.org:3001/insight-api",
            dashsocketBaseUrl: "http://insight.testnet.networks.dash.org:3001/socket.io",
            insightBaseUrl: "http://insight.testnet.networks.dash.org:3001/insight-api",
        });
    }

    async sync() {
    }

    /**
     * Returns next unused address from the wallet
     */
    async getAddress() {
        return this.wallet.getReceivingAddress()
    }
}



