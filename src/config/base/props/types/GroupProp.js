import BaseProp from "../../BaseProp"

export default class GroupProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: 'group',
        }, options)

        this.enums = params.enums;
    }
}