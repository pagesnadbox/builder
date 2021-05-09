import BaseProp from "../BaseProp"

export default new BaseProp({
    displayName: 'Size',
    propName: 'size',
    type: 'enum',
    enums: ['text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6'],
})