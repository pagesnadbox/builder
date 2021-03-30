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

const horizontal =             {
    displayName: 'Horizontal',
    propName: 'horizontal',
    type: 'boolean',
}

const hidden = {
    displayName: 'Hidden',
    propName: 'hidden',
    type: 'switch',
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

const maxWidth = {
    displayName: 'Max Width',
    propName: 'maxWidth',
    type: 'string',
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

const mobileSize = {
    displayName: 'Mobile Size',
    propName: 'mobileSize',
    type: 'string',
}

const weight = {
    displayName: 'Weight',
    propName: 'weight',
    type: 'string',
}

const dense = {
    displayName: 'Dense',
    propName: 'dense',
    type: 'boolean',
}

const dark = {
    displayName: 'Dark',
    propName: 'dark',
    type: 'boolean',
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

/// ///

const baseHeading = {
    displayName: 'Heading',
    props: [
        title,
        align,
        dense,
        size,
        space,
        // mobileSize,
        weight,
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
        {
            displayName: 'Items',
            propName: 'items',
            type: 'array',
        },
        {
            displayName: 'Items per row (Mobile)',
            propName: 'cols',
            type: 'enum',
            enums: ['1', '2', '3', '4', '5', '6'],
        }, ,
        {
            displayName: 'Items per row (Desktop)',
            propName: 'md',
            type: 'enum',
            enums: ['1', '2', '3', '4', '5', '6'],
        },
    ],
}

const baseImg = {
    displayName: 'Image',
    props: [
        mobileHeight,
        height,
        {
            displayName: 'Light source',
            propName: 'src',
            type: 'file',
        },
        {
            displayName: 'Dark Source',
            propName: 'srcDark',
            type: 'file',
        },
    ],

};

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
                displayName: 'Remove Shadow',
                propName: 'depressed',
                type: 'boolean',
            },
            {
                displayName: 'Tile',
                propName: 'tile',
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
            dark,
            horizontal,
            title,
            text,
            divider,
            label("Image"),
            ...baseImg.props,
            divider,
            label("Icon"),
            icon,
            iconSize,
            color,
            outlined,
            // space,
        ],
    },

    BaseHeading: baseHeading,

    BaseTitle: {
        ...baseHeading,
        displayName: 'Title',
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
            dark,
            icon,
            subtitle,
            title,
            text,
            color,
        ],
    },

    BaseSection: {
        displayName: 'Section',
        props: [
            dark,
            space,
            color,
        ],
    },
    
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
            { ... color, displayName: "Background Color" },
            divider,
            label("Icon"),
            icon,
            iconSize,
            { ... iconColor, displayName: "Icon Color" },
        ],
    },

    BaseResizeContainer: {
        displayName: 'Resize Container',
        props: [
            ...mixinHeading.props,
            dark,
            space,
            maxWidth,
        ],
    },

    BaseList: baseList,
    
    BaseSlideList: {
        ...baseList,
        displayName: 'Slide List',
    },
}
