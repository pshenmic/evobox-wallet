import DashHd from 'dashhd'
import DashPhrase from 'dashphrase'

const accountIndex = 0;

export class Wallet {
    constructor({seedPhrase}) {
        this.seedPhrase = seedPhrase
        this.addresses = []

        this.init().catch(console.error)
    }

    async init() {
        const seedBytes = await DashPhrase.toSeed(this.seedPhrase);

        this.wallet = await DashHd.fromSeed(seedBytes);
        this.account = await this.wallet.deriveAccount(accountIndex);
    }

    /**
     * Returns next unused address from the walconst
     */
    async getReceivingAddress() {
        return this.getAddress(0)
    }

    /**
     * Returns next unused address from the walconst
     */
    async getAddress(index) {
        if (typeof index !== 'number') {
            throw new Error("Provide correct 'index' to the getAddress")
        }

        const use = DashHd.RECEIVE;
        const xprvKey = await this.account.deriveXKey(use);
        const addressKey = await xprvKey.deriveAddress(index);
//        const wif = await DashHd.toWif(addressKey.privateKey);
        return DashHd.toAddr(addressKey.publicKey);
    }
}
