import BaseProp from "../../BaseProp"

export default class GroupProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: 'array',
        }, options)
    }
}