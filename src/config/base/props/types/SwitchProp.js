import BaseProp from "../../BaseProp"

export default class SwitchProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: "switch"
        }, options)
    }
}