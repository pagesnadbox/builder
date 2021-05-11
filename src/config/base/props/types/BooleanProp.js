import BaseProp from "../../BaseProp"

export default class BooleanProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: "boolean"
        }, options)
    }
}