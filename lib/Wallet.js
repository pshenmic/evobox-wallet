import DashHd from 'dashhd'
import DashPhrase from 'dashphrase'

const accountIndex = 0;

export class Wallet {
    constructor({seedPhrase, sdk}) {
        this.sdk = sdk
        this.seedPhrase = seedPhrase
        this.index = 0
    }

    async init() {
        const seedBytes = await DashPhrase.toSeed(this.seedPhrase);

        this.wallet = await DashHd.fromSeed(seedBytes, {versions: DashHd.TESTNET});
        this.account = await this.wallet.deriveAccount(accountIndex);

        let txs

        do {
            const address = await this.getAddress(this.index)

            txs = await this.sdk.getTransactions(address)

            if (txs.txs.length) {
                this.index++
            }
        } while (txs.txs.length)
    }

    /**
     * Get the balance wallet-wise
     */
    async getBalance() {
        let balance = 0
        let txCount = 0
        let index = 0;

        do {
            const address = await this.getAddress(index)
            const txs = await this.sdk.getTransactions(address)
            const utxos = await this.sdk.getUTXOs(address)

            balance = utxos.reduce((acc, utxo) => acc + utxo.amount, balance)
            txCount = txs.txs.length

            console.log(`${address} txs[${txCount}] balance ${balance}`)

            index++
        } while (txCount)

        return balance
    }

    /**
     * Returns next unused address from the wallet
     */
    async getReceivingAddress() {
        return this.getAddress(this.index)
    }

    /**
     * Returns next unused address from the wallet
     */
    async getAddress(index) {
        if (typeof index !== 'number') {
            throw new Error("Provide correct 'index' to the getAddress")
        }

        const use = DashHd.RECEIVE;
        const xprvKey = await this.account.deriveXKey(use);
        const addressKey = await xprvKey.deriveAddress(index);
        const address = await DashHd.toAddr(addressKey.publicKey, {version: 'testnet'});
        // const wif = await DashHd.toWif(addressKey.privateKey);

        return address
    }
}
