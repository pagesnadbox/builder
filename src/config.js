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
    gradient,
    fluid,
    fillHeight,
    preventWrap,
    justify,
    rowAlign,
    size,
    mobileSize,
    sizeBtn,
    icon,
    iconSize,
    iconSrc,
    text,
    title,
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
    lightSrc,
    publicPath,
    cols,
} = props;

const getCols = (...params) => cols.getCols(...params)
const md = getCols("md");

class MixinHeading extends BaseComponent {
    constructor() {
        super({
            props: [
                align,
            ]
        });
    }
}

class BaseHeading extends MixinHeading {
    constructor() {
        super();
        this.displayName = 'Heading'
    }

    get customProps() {
        return [
            ...super.customProps,
            title,
            align,
            color,
            // dense,
            size,
            mobileSize,
            weight,
        ]
    }
}

class BaseTitle extends BaseHeading {
    constructor() {
        super();
        this.displayName = 'Title'
    }
}

class BaseBody extends MixinHeading {
    constructor() {
        super();
        this.displayName = 'Body'
    }

    get customProps() {
        return [
            ...super.customProps,
            color,
            text,
            {
                displayName: 'HTML',
                propName: 'html',
                type: 'string',
            },
            maxWidth,
        ]
    }
}

class BaseImage extends BaseComponent {
    constructor() {
        super();
        this.displayName = 'Image'
    }

    get customProps() {
        return [
            mobileHeight,
            height,
            maxWidth,
            lightSrc,
        ]
    }
}

class BaseVuetifyImage extends BaseImage {
    constructor() {
        super();
        this.displayName = 'Vuetify Image'
    }

    get customProps() {
        return [
            ...super.customProps,
            gradient
        ]
    }
}

const baseHeading = new BaseHeading()

const baseSection = new BaseComponent({
    displayName: 'Section',
    props: [
        dark,
        height,
        maxWidth,
        color,
    ],
})


const mixinHeading = new BaseComponent({
    props: [
        align,
    ],
})

const baseImg = new BaseImage()

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

    BaseDrawer: new BaseComponent({
        displayName: 'Drawer',
        props: [],
    }),

    BaseDrawerButton: new BaseComponent({
        displayName: 'Drawer Toggle Button',
        props: [],
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
            preventWrap,
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

    BaseVuetifyImg: new BaseVuetifyImage(),

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
            sizeBtn,
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
        ],
    }),

    BaseHeading: baseHeading,

    BaseTitle: new BaseTitle(),

    BaseText: new BaseComponent({
        displayName: "Text",
        props: [
            text,
            color
        ]
    }),

    BaseSubtitle: new BaseComponent({
        ...baseHeading,
        displayName: 'Sub Title',
        props: [
            ...baseHeading.props,
            title,
            text,
        ],
    }),

    BaseBody: new BaseBody(),

    BaseDivider: new BaseComponent({
        displayName: 'Divider',
        props: [
            color,
            dense,
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
            { ...color, displayName: "Background Color" },
            divider,
            label("Icon"),
            icon,
            iconSize,
            { ...iconColor, displayName: "Icon Color" },
        ],
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
            }
        ]
    })
}
