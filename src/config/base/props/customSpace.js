import StringProp from "./types/StringProp"

class CustomSpace extends StringProp {
    constructor(params, options) {
        super(params, options)
    }

    getSpace(type) {
        return {
            ...this,
            displayName: `${type} CSS`,
            propName: type.toLowerCase(),
        }
    }
}


export default new CustomSpace()
