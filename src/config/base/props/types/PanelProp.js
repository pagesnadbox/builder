import BaseProp from "../../BaseProp"

export default class PanelProp extends BaseProp {
    constructor(params, options = {}) {
        super({
            ...params,
            type: 'panel',
        }, options)

        this.props = params.props;
    }
}