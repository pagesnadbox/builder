import EnumProp from "./types/EnumProp"

export default new EnumProp({
    displayName: 'Size',
    propName: 'size',
    defaultValue: "text-h2",
    enums: ['text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6'],
})