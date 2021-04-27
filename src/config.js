const divider = {
    displayName: '',
    type: 'divider',
}

const label = (label) => ({
    displayName: label,
    type: 'label',
})

const color = {
    displayName: 'Color',
    propName: 'color',
    type: 'color',
}

const iconColor = {
    displayName: 'Icon color',
    propName: 'iconColor',
    type: 'color',
}

const size = {
    displayName: 'Size',
    propName: 'size',
    type: 'enum',
    enums: ['text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6'],
}

const mobileSize = {
    displayName: 'Size Mobile',
    propName: 'mobileSize',
    type: 'enum',
    enums: ['text-h1', 'text-h2', 'text-h3', 'text-h4', 'text-h5', 'text-h6'],
}

const sizeDef = {
    displayName: 'Size',
    propName: 'size',
    type: 'enum',
    enums: ['x-small', 'small', 'normal', 'large', 'x-large'],
}

const icon = {
    displayName: 'Icon',
    propName: 'icon',
    type: 'icon',
}

const iconSize = {
    displayName: 'Icon size',
    propName: 'size',
    type: 'string',
}

const iconSrc = {
    displayName: 'Icon',
    propName: 'iconSrc',
    type: 'icon',
}

const text = {
    displayName: 'Text',
    propName: 'text',
    type: 'string',
}

const title = {
    displayName: 'Title',
    propName: 'title',
    type: 'string',
}

const space = {
    displayName: 'Space (top and bottom space in px)',
    propName: 'space',
    type: 'string',
}

const outlined = {
    displayName: 'Outlined',
    propName: 'outlined',
    type: 'boolean',
}

const horizontal = {
    displayName: 'Horizontal',
    propName: 'horizontal',
    type: 'boolean',
}

const hidden = {
    displayName: 'Hidden',
    propName: 'hidden',
    type: 'switch',
}

const hiddenImage = {
    ...hidden,
    propName: 'hiddenImage',
}

const subtitle = {
    displayName: 'Subtitle',
    propName: 'subtitle',
    type: 'string',
}

const align = {
    displayName: 'Align',
    propName: 'align',
    type: 'group',
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
}

const height = {
    displayName: 'Height (px)',
    propName: 'height',
    type: 'string',
}

const mobileHeight = {
    displayName: 'Mobile Height (px)',
    propName: 'mobileHeight',
    type: 'string',
}

const mobileWidth = {
    displayName: 'Mobile width',
    propName: 'mobileMinWidth',
    type: 'string',
}

const maxWidth = {
    displayName: 'Max Width',
    propName: 'maxWidth',
    type: 'string',
}

const minWidth = {
    displayName: 'Desktop width',
    propName: 'minWidth',
    type: 'string',
}

const weight = {
    displayName: 'Weight',
    propName: 'weight',
    type: 'enum',
    enums: [
        "black",
        "bold",
        "medium",
        "regular",
        "light",
        "thin",
    ],
}

const dense = {
    displayName: 'Dense',
    propName: 'dense',
    type: 'boolean',
}

const dark = {
    displayName: 'Dark',
    propName: 'dark',
    type: 'boolean'
}

const iconDark = {
    ...dark,
    propName: 'iconDark',
    options: {
        indeterminate: true
    }
}

const hideOnScroll = {
    displayName: 'Hide on scroll',
    propName: 'hideOnScroll',
    type: 'boolean',
}

const href = {
    displayName: 'URL',
    propName: 'href',
    type: 'string',
}

const openInNewTab = {
    displayName: 'Open in new tab',
    propName: 'openInNewTab',
    type: 'boolean',
}

const textOnly = {
    displayName: 'Text Only',
    propName: 'textOnly',
    type: 'boolean',
}

const items = {
    displayName: 'Items',
    propName: 'items',
    type: 'array',
}

const aggregations = {
    displayName: "Aggregations",
    type: 'array',
}

const lightSrc = {
    displayName: 'URL',
    propName: 'src',
    type: 'file',
}

const darkSrc = {
    displayName: 'Dark Source',
    propName: 'srcDark',
    type: 'file',
}

const cols = {
    displayName: 'Items per row (Mobile)',
    propName: 'cols',
    type: 'enum',
    enums: ['1', '2', '3', '4', '5', '6'],
}

const md = {
    displayName: 'Items per row (Desktop)',
    propName: 'md',
    type: 'enum',
    enums: ['1', '2', '3', '4', '5', '6'],
}
/// ///

const baseHeading = {
    displayName: 'Heading',
    props: [
        title,
        align,
        // dense,
        size,
        space,
        mobileSize,
        weight,
    ],
}

const baseSection = {
    displayName: 'Section',
    props: [
        dark,
        space,
        height,
        color,
    ],
}

const mixinHeading = {
    props: [
        align,
    ],
}

const baseList = {
    displayName: 'List',
    type: 'list',
    props: [
        space,
        items,
        cols,
        md
    ],
}

const baseImg = {
    displayName: 'Image',
    props: [
        hidden,
        mobileHeight,
        height,
        maxWidth,
        lightSrc,
        // darkSrc
    ],

};

const avatarCardImage = {
    ...baseImg,
    props: [
        ...baseImg.props.map(p => p.propName === "hidden" ? hiddenImage : p)
    ]
}

export default {
    BaseApp: {
        displayName: 'Application',
        type: 'list',
    },

    BaseAppBar: {
        displayName: 'Application Top Bar',
        props: [
            dark,
            hideOnScroll,
            height,
            color,
        ],
    },

    BaseVuetifyImg: baseImg,

    BaseImg: baseImg,

    BaseActions: {
        displayName: 'Call-To-Action',
        props: [
            horizontal,
            {
                displayName: 'Link Call-to-Action',
                propName: 'linkAction',
                type: 'boolean',
            },
            {
                displayName: 'Email Call-to-Action',
                propName: 'emailFormActions',
                type: 'boolean',
            },
            {
                displayName: 'Main Call-to-Action',
                propName: 'mainAction',
                type: 'boolean',
            },
            {
                displayName: 'Secondary Call-to-Action',
                propName: 'secondaryAction',
                type: 'boolean',
            },
        ]
    },

    BaseBtn: {
        displayName: 'Button',
        props: [
            hidden,
            text,
            sizeDef,
            iconSrc,
            dark,
            textOnly,
            openInNewTab,
            {
                displayName: 'Full Width',
                propName: 'block',
                type: 'boolean',
            },
            {
                displayName: 'Full Width on Mobile',
                propName: 'blockOnMobile',
                type: 'boolean',
            },
            {
                displayName: 'Remove Shadow',
                propName: 'depressed',
                type: 'boolean',
            },
            {
                displayName: 'Tile',
                propName: 'tile',
                type: 'boolean',
            },
            {
                displayName: 'Outlined',
                propName: 'outlined',
                type: 'boolean',
            },
            color,
            href,
            {
                displayName: 'Min Width',
                propName: 'minWidth',
                type: 'string',
            },

        ],
    },

    BaseLink: {
        displayName: 'Link',
        props: [
            hidden,
            openInNewTab,
            href,
        ],
    },

    BaseAvatar: {
        displayName: 'Avatar',
        props: [
            icon,
            color,
            outlined,
            size,
        ],
    },

    BaseAvatarCard: {
        displayName: 'Avatar Card',
        props: [
            ...mixinHeading.props,
            hidden,
            outlined,
            horizontal,
            title,
            text,
            divider,
            label("Image"),
            ...avatarCardImage.props,
            divider,
            label("Icon"),
            iconDark,
            icon,
            iconSize,
            color,
            // space,
        ],
    },

    BaseHeading: baseHeading,

    BaseTitle: {
        ...baseHeading,
        displayName: 'Title',
    },

    BaseText: {
        displayName: "Text",
        props: [
            text
        ]
    },

    BaseSubtitle: {
        ...baseHeading,
        displayName: 'Sub Title',
        props: [
            ...baseHeading.props,
            title,
            text,
            space,
        ],
    },

    BaseBody: {
        displayName: 'Body',
        props: [
            ...mixinHeading.props,
            text,
            {
                displayName: 'HTML',
                propName: 'html',
                type: 'string',
            },
            maxWidth,
            space,
        ],
    },

    BaseDivider: {
        displayName: 'Divider',
        props: [
            color,
            dense,
            space,
        ],
    },

    BaseIcon: {
        displayName: 'Icon',
        props: [
            icon,
            color,
            size,
        ],
    },

    BaseInfoCard: {
        displayName: 'Info Card',
        props: [
            ...mixinHeading.props,
            hidden,
            icon,
            subtitle,
            title,
            text,
            color,
        ],
    },

    BaseSection: baseSection,

    BaseSectionHeading: {
        displayName: 'Section Heading',
        props: [
            align,
            outlined,
            dark,
            subtitle,
            title,
            text,
            space,
            { ...color, displayName: "Background Color" },
            divider,
            label("Icon"),
            icon,
            iconSize,
            { ...iconColor, displayName: "Icon Color" },
        ],
    },

    BaseHero: {
        displayName: 'Hero',
        props: [
            dark,
            space,
            height,
            mobileHeight,
            aggregations,
            label("Background"),
            divider,
            {
                displayName: "Overlay",
                type: "boolean",
                propName: "overlay"
            },
            lightSrc,
            // darkSrc,
            {
                ...color,
                displayName: 'Solid Color'
            },
        ],
    },

    BaseHeroContainer: {
        displayName: 'Hero Container',
        props: [
            ...mixinHeading.props,
            space,
            maxWidth,
            // aggregations
        ],
    },

    BaseList: baseList,

    BaseSlideList: {
        displayName: 'Slide List',
        props: [
            items
        ]
    },

    BaseInput: {
        displayName: 'Input',
        props: [
            dark,
            dense,
            {
                displayName: "Filled",
                propName: "Filled",
                type: 'boolean'
            },
            {
                displayName: "Solo",
                propName: "solo",
                type: 'boolean'
            },
            {
                displayName: "Solo inverted",
                propName: "soloInverted",
                type: 'boolean'
            },
            {
                displayName: "Outlined",
                propName: "outlined",
                type: 'boolean'
            },
            {
                displayName: "Filled",
                propName: "filled",
                type: 'boolean'
            },
            {
                displayName: "Clearable",
                propName: "clearable",
                type: 'boolean'
            },
            {
                displayName: "Shaped",
                propName: "shaped",
                type: 'boolean'
            },
            {
                displayName: "Placeholder",
                propName: "placeholder",
                type: 'string'
            },
            {
                displayName: "Label",
                propName: "label",
                type: 'string'
            },
            {
                displayName: "Name",
                propName: "name",
                type: 'string'
            },
            minWidth,
            {
                displayName: "Color",
                propName: "color",
                type: 'color'
            },
        ]
    },

    BaseEmailForm: {
        displayName: 'Email Form',
        props: [
            {
                displayName: "Method",
                propName: "method",
                type: 'string'
            },
            {
                displayName: "Action",
                propName: "action",
                type: 'string'
            },
            {
                displayName: "Field Name",
                propName: "name",
                type: 'string'
            },
        ]
    },
}
