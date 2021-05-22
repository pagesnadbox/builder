import BaseProp from "../../BaseProp"

export default class IconProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: 'file',
        }, options)
    }
}