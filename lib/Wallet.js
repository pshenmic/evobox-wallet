export class Wallet {
    constructor({seedPhrase}) {
        this.init().catch(console.error)

        this.addresses = []
    }

    async init() {
    }

    /**
     * Returns next unused address from the wallet
     */
    async getReceivingAddress() {
        return "fake"
    }
}
