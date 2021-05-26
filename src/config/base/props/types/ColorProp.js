import BaseProp from "../../BaseProp"

export default class ColorProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: 'color',
        }, options)
    }
}