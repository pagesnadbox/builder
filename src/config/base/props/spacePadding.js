import EnumProp from "./types/EnumProp"

class SpacePadding extends EnumProp {
    constructor(params, options) {
        super(params, options)
    }

    getPadding(side) {
        return {
            ...this,
            displayName: `Padding (${side})`,
            propName: this.getPropName(side),
        }
    }

    getPropName(side) {
        const positions = {
            all: "pa",
            left: "pl",
            right: "pr",
            top: "pt",
            bottom: "pb",
        }

        return positions[side]
    }
}

export default new SpacePadding({
    displayName: 'Padding all',
    propName: 'pa',
    enums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '15'],
})