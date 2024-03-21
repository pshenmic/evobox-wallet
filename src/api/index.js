import {DashPlatformApi} from "./DashPlatformApi";

export const api = {
    DashPlatformApi
}



const sdk = new DashPlatformApi({explorerUrl: '', insightUrl: '' })

await sdk.sync()

const identity = await sdk.registerIdentity()
