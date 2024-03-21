import WasmDPP from '@dashevo/wasm-dpp'

export class Builder {
    #dataContract
    #identity

    constructor() {
    }

    async dataContract(identifier) {
        this.dataContract = identifier

        return this
    }

    identity(identifier) {
        this.identity = identifier
    }

    build() {

    }
}
