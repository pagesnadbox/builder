import StringProp from "./types/StringProp"

class CustomSpace extends StringProp {
    constructor(params, options) {
        super(params, options)
    }

    getSpace(type, label) {
        return {
            ...this,
            type: "space",
            displayName: label,
            propName: type,
        }
    }
}


export default new CustomSpace()
