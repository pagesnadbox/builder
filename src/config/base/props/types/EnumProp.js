import BaseProp from "../../BaseProp"

export default class EnumProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: 'enum',
        }, options)

        this.enums = params.enums;
    }
}