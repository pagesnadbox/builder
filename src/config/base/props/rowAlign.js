import EnumProp from "./types/EnumProp"

export default new EnumProp({
    displayName: 'Align',
    propName: 'align',
    enums: [
        "start",
        "center",
        "end",
        "baseline",
        "stretch",
    ],
})