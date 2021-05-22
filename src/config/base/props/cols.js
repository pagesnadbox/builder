import EnumProp from "./types/EnumProp"

class Cols extends EnumProp {
    constructor(params, options) {
        super(params, options)
    }

    getCols(breakpoint) {
        return {
            ...this,
            displayName: `Cols (${breakpoint})`,
            propName: breakpoint,
        }
    }
}

export default new Cols({
    displayName: 'Columns per row',
    propName: 'cols',
    enums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
})