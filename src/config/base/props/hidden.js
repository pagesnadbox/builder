import BaseProp from "../BaseProp"

class Hidden extends BaseProp { }

export default new Hidden({
    displayName: 'Hidden',
    propName: 'hidden',
    type: 'switch',
})