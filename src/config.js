import props from "./config/base/props"
import BaseComponent from "./config/base/BaseComponent";

const divider = {
    displayName: '',
    type: 'divider',
}

const label = (label) => ({
    displayName: label,
    type: 'label',
})

const {
    color,
    iconColor,
    fluid,
    fillHeight,
    justify,
    rowAlign,
    size,
    mobileSize,
    sizeDef,
    icon,
    iconSize,
    iconSrc,
    text,
    title,
    space,
    outlined,
    horizontal,
    hiddenImage,
    subtitle,
    align,
    height,
    mobileHeight,
    mobileWidth,
    maxWidth,
    minWidth,
    weight,
    dense,
    dark,
    iconDark,
    hideOnScroll,
    href,
    openInNewTab,
    block,
    blockOnMobile,
    depressed,
    tile,
    textOnly,
    items,
    aggregations,
    lightSrc,
    publicPath,
    cols,
} = props;

const getCols = (...params) => cols.getCols(...params)
const md = getCols("md");

const baseHeading = new BaseComponent({
    displayName: 'Heading',
    props: [
        title,
        align,
        // dense,
        size,
        // space,
        mobileSize,
        weight,
    ],
})

const baseSection = new BaseComponent({
    displayName: 'Section',
    props: [
        dark,
        space,
        height,
        color,
    ],
})


const mixinHeading = new BaseComponent({
    props: [
        align,
    ],
})

const baseList = new BaseComponent({
    displayName: 'List',
    type: 'list',
    props: [
        // space,
        items,
        cols,
        md
    ],
})

const baseImg = new BaseComponent({
    displayName: 'Image',
    props: [

        mobileHeight,
        height,
        maxWidth,
        lightSrc,
        // darkSrc
    ],

})

const avatarCardImage = new BaseComponent({
    ...baseImg,
    props: [
        ...baseImg.props.map(p => p.propName === "hidden" ? hiddenImage : p)
    ]
})

export default {
    BaseApp: new BaseComponent({
        displayName: 'Application',
        props: [
            publicPath,
        ],
    }),

    BaseContainer: new BaseComponent({
        displayName: 'Container',
        props: [
            fillHeight,
            fluid
        ]
    }),

    BaseRow: new BaseComponent({
        displayName: 'Row',
        props: [
            fillHeight,
            justify,
            rowAlign
        ]
    }),

    BaseCol: new BaseComponent({
        displayName: 'Column',
        props: [
            getCols("cols"),
            getCols("sm"),
            getCols("md"),
            getCols("lg"),
            getCols("xl"),
        ]
    }),

    BaseAppBar: new BaseComponent({
        displayName: 'Application Top Bar',
        props: [
            dark,
            hideOnScroll,
            height,
            color,
        ],
    }),

    BaseVuetifyImg: baseImg,

    BaseImg: baseImg,

    BaseActions: new BaseComponent({
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
    }),

    BaseBtn: new BaseComponent({
        displayName: 'Button',
        props: [
    
            text,
            sizeDef,
            iconSrc,
            dark,
            textOnly,
            openInNewTab,
            block,
            blockOnMobile,
            depressed,
            tile,
            outlined,
            color,
            href,
            minWidth,
        ],
    }),

    BaseLink: new BaseComponent({
        displayName: 'Link',
        props: [
    
            openInNewTab,
            href,
        ],
    }),

    BaseAvatar: new BaseComponent({
        displayName: 'Avatar',
        props: [
            icon,
            color,
            outlined,
            size,
        ],
    }),

    BaseAvatarCard: new BaseComponent({
        displayName: 'Avatar Card',
        props: [
            ...mixinHeading.props,
    
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
    }),

    BaseHeading: baseHeading,

    BaseTitle: new BaseComponent({
        ...baseHeading,
        displayName: 'Title',
    }),

    BaseText: new BaseComponent({
        displayName: "Text",
        props: [
            text
        ]
    }),

    BaseSubtitle: new BaseComponent({
        ...baseHeading,
        displayName: 'Sub Title',
        props: [
            ...baseHeading.props,
            title,
            text,
            // space,
        ],
    }),

    BaseBody: new BaseComponent({
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
            // space,
        ],
    }),

    BaseDivider: new BaseComponent({
        displayName: 'Divider',
        props: [
            color,
            dense,
            // space,
        ],
    }),

    BaseIcon: new BaseComponent({
        displayName: 'Icon',
        props: [
            openInNewTab,
            href,
            icon,
            color,
            size,
        ],
    }),

    BaseInfoCard: new BaseComponent({
        displayName: 'Info Card',
        props: [
            ...mixinHeading.props,
    
            icon,
            subtitle,
            title,
            text,
            color,
        ],
    }),

    BaseSection: baseSection,

    BaseSectionHeading: new BaseComponent({
        displayName: 'Section Heading',
        props: [
            align,
            outlined,
            dark,
            subtitle,
            title,
            text,
            // space,
            { ...color, displayName: "Background Color" },
            divider,
            label("Icon"),
            icon,
            iconSize,
            { ...iconColor, displayName: "Icon Color" },
        ],
    }),

    BaseHero: new BaseComponent({
        displayName: 'Hero',
        props: [
            dark,
            // space,
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
    }),

    BaseHeroContainer: new BaseComponent({
        displayName: 'Hero Container',
        props: [
            ...mixinHeading.props,
            // space,
            maxWidth,
            // aggregations
        ],
    }),

    BaseList: baseList,

    BaseSlideList: new BaseComponent({
        displayName: 'Slide List',
        props: [
            items
        ]
    }),

    BaseInput: new BaseComponent({
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
    }),

    BaseEmailForm: new BaseComponent({
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
    })
}
