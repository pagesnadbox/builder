import GroupProp from "./types/GroupProp"

export default new GroupProp({
    displayName: 'Align',
    propName: 'align',
    enums: [
        {
            icon: 'mdi-format-align-left',
            value: 'left',
        },
        {
            icon: 'mdi-format-align-center',
            value: 'center',
        },
        {
            icon: 'mdi-format-align-right',
            value: 'right',
        },
        {
            icon: 'mdi-format-float-none',
            value: '',
        },
    ],
})