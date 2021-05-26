import BaseProp from "../../BaseProp"

export default class StringProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: 'string',
        }, options)
    }
}