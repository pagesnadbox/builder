import EnumProp from "./types/EnumProp"

class SpaceMargin extends EnumProp {
    constructor(params, options) {
        super(params, options)
    }

    getMargin(side) {
        return {
            ...this,
            displayName: `Margin (${side})`,
            propName: this.getPropName(side),
        }
    }

    getPropName(side) {
        const positions = {
            all: 'ma',
            left: "ml",
            right: "mr",
            top: "mt",
            bottom: "mb",
        }

        return positions[side]
    }
}

export default new SpaceMargin({
    displayName: 'Margin all',
    propName: 'ma',
    enums: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '15'],
})