import {
    PrivateKey, Transaction, Script, Address, Opcode, Networks
} from '../../../../dashcore-lib/index';
//
// // We're creating a new transaction every time and the index is always 0
const ASSET_LOCK_OUTPUT_INDEX = 0;

/**
 * Creates a funding transaction for the platform identity
 *  and returns one-time key to sign the state transition
 * @param inputs
 * @param {number} fundingAmount - amount of dash to fund the identity's credits
 * @param signingKeys
 * @param network
 * @return {Promise<{transaction: Transaction, privateKey: PrivateKey}>}
 *  - transaction and one time private key
 * that can be used to sign registration/top-up state transition
 */
export default async function createAssetLockTransaction({inputs, fundingAmount, signingKeys, network}) {
    if (!inputs) {
        throw new Error("UTXO inputs must be specified")
    }

    if (!fundingAmount) {
        throw new Error("Amount must be specified")
    }

    if (!signingKeys) {
        throw new Error("Signing keys must be specified")
    }

    if (!network) {
        throw new Error("Network must be specified")
    }

    const assetLockOneTimePrivateKey = PrivateKey.fromRandom(network)

    const assetLockOneTimePublicKey = assetLockOneTimePrivateKey.toPublicKey();

    const identityAddress = assetLockOneTimePublicKey.toAddress(network).toString();

    const lockTransaction = new Transaction(undefined);

    const output = {
        satoshis: fundingAmount,
        address: identityAddress,
    };

    const realOutput = {
        satoshis: output.satoshis,
        script: Script
            .buildPublicKeyHashOut(Address.fromString(identityAddress, network)).toString(),
    };

    const payload = Transaction.Payload.AssetLockPayload.fromJSON({
        version: 1,
        creditOutputs: [{
            satoshis: realOutput.satoshis,
            script: realOutput.script,
        }],
    });


    const changeAddress = Address.fromString('yeRZBWYfeNE4yVUHV4ZLs83Ppn9aMRH57A', network)

    lockTransaction
        .setType(Transaction.TYPES.TRANSACTION_ASSET_LOCK)
        .from(inputs)
        .addOutput(
            new Transaction.Output({
                satoshis: realOutput.satoshis,
                // @ts-ignore
                script: new Script().add(Opcode.OP_RETURN).add(Buffer.alloc(0)),
            }),
        )
        .change(changeAddress)
        .setExtraPayload(payload);

    const transaction = lockTransaction.sign(signingKeys);

    return {
        transaction,
        privateKey: assetLockOneTimePrivateKey,
        outputIndex: ASSET_LOCK_OUTPUT_INDEX,
    };
}
