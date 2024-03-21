export class Wallet {

    constructor() {
        this.init().catch(console.error)
    }

    async init() {
        // init
    }

    /**
     * Returns next unused address from the wallet
     */
    async getReceivingAddress() {
    }
    getTransactions(address) {
        return []
    }
    registerIdentity(address) {
    }
}
