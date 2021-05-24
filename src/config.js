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
        this.componentName = 'BaseHeading'
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
        this.componentName = 'BaseTitle'
    }
}

class BaseSubtitle extends BaseHeading {
    constructor() {
        super();
        this.displayName = 'Sub Title'
        this.componentName = 'BaseSubtitle'
    }

    get customProps() {
        return [
            ...super.customProps,
            title,
            text,
        ]
    }
}

class BaseBody extends MixinHeading {
    constructor() {
        super();
        this.displayName = 'Body'
        this.componentName = 'BaseBody'
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
        this.componentName = 'BaseImg'
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
        this.displayName = 'Advanced Image'
        this.componentName = 'BaseVuetifyImage'
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
    componentName: 'BaseSection',
    displayName: 'Section',
    props: [
        dark,
        height,
        maxWidth,
        color,
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
        componentName: "BaseApp",
        displayName: 'Application',
        props: [
            publicPath,
        ],
    }),

    BaseDrawer: new BaseComponent({
        componentName: "BaseDrawer",
        displayName: 'Drawer',
        props: [],
    }),

    BaseDrawerButton: new BaseComponent({
        componentName: "BaseDrawerButton",
        displayName: 'Drawer Toggle Button',
        props: [],
    }),

    BaseContainer: new BaseComponent({
        componentName: "BaseContainer",
        displayName: 'Container',
        props: [
            fillHeight,
            fluid
        ]
    }),

    BaseRow: new BaseComponent({
        componentName: "BaseRow",
        displayName: 'Row',
        props: [
            preventWrap,
            fillHeight,
            justify,
            rowAlign
        ]
    }),

    BaseCol: new BaseComponent({
        componentName: "BaseCol",
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
        componentName: "BaseAppBar",
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
        componentName: "BaseActions",
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
        componentName: "BaseBtn",
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
        componentName: "BaseLink",
        displayName: 'Link',
        props: [
            openInNewTab,
            href,
            color
        ],
    }),

    BaseAvatar: new BaseComponent({
        componentName: "BaseAvatar",
        displayName: 'Avatar',
        props: [
            icon,
            color,
            outlined,
            size,
        ],
    }),

    BaseAvatarCard: new BaseComponent({
        componentName: "BaseAvatarCard",
        displayName: 'Avatar Card',
        props: [
            align,
            outlined,
            horizontal,
            title,
            text,
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
        componentName: "BaseText",
        displayName: "Text",
        props: [
            text,
            color
        ]
    }),

    BaseSubtitle: new BaseSubtitle(),

    BaseBody: new BaseBody(),
    componentName: "BaseBody",

    BaseDivider: new BaseComponent({
        componentName: "BaseDivider",
        displayName: 'Divider',
        props: [
            color,
            dense,
        ],
    }),

    BaseIcon: new BaseComponent({
        componentName: "BaseIcon",
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
        componentName: "BaseInfoCard",
        displayName: 'Info Card',
        props: [
            align,
            icon,
            subtitle,
            title,
            text,
            color,
        ],
    }),

    BaseSection: baseSection,

    BaseSectionHeading: new BaseComponent({
        componentName: "BaseSectionHeading",
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
        componentName: "BaseInput",
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
        componentName: "BaseEmailForm",
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
    }),

    BaseSpacer: new BaseComponent({
        componentName: "BaseSpacer",
        displayName: 'Spacer',
    }),

    BaseTabs: new BaseComponent({
        componentName: "BaseTabs",
        displayName: 'Tabs',
    }),

    BaseTab: new BaseComponent({
        componentName: "BaseTab",
        displayName: 'Tab',
        props: [
            text,
            {
                displayName: "Go to (element id)",
                propName: "goTo",
                type: 'string'
            }
        ]
    })
}
