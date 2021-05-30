import props from "./base/props"
import BaseComponent from "./base/BaseComponent";

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
    tag,
    absolute,
    elevation,
    shrinkOnScroll,
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
    rounded
} = props;

const getCols = (...params) => cols.getCols(...params)
const md = getCols("md");

class MixinHeading extends BaseComponent {
    constructor() {
        super({
            displayIcon: "mdi-format-header-pound",
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
            tag,
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


class BaseBody extends MixinHeading {
    constructor() {
        super();
        this.displayIcon = "mdi-format-text"
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
        this.displayIcon = "mdi-image-outline"
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
        this.displayIcon = "mdi-image-plus"
        this.displayName = 'Image'
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
    displayIcon: "mdi-camera-metering-partial",
    componentName: 'BaseSection',
    displayName: 'Section',
    props: [
        dark,
        absolute,
        elevation,
        rounded,
        height,
        maxWidth,
        color,
    ],
})

export default {
    BaseApp: new BaseComponent({
        displayIcon: "mdi-application",
        componentName: "BaseApp",
        displayName: 'Application',
        props: [
            publicPath,
        ],
    }),

    BaseDrawer: new BaseComponent({
        displayIcon: "mdi-dock-left",
        componentName: "BaseDrawer",
        displayName: 'Drawer',
        props: [],
    }),

    BaseDrawerButton: new BaseComponent({
        displayIcon: "mdi-microsoft-xbox-controller-menu",
        componentName: "BaseDrawerButton",
        displayName: 'Drawer Button',
        props: [],
    }),

    BaseContainer: new BaseComponent({
        displayIcon: "mdi-rectangle-outline",
        componentName: "BaseContainer",
        displayName: 'Container',
        props: [
            fillHeight,
            fluid
        ]
    }),

    BaseRow: new BaseComponent({
        displayIcon: "mdi-table-row",
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
        displayIcon: "mdi-table-column",
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
        displayIcon: "mdi-dock-top",
        componentName: "BaseAppBar",
        displayName: 'Application Top Bar',
        props: [
            dark,
            shrinkOnScroll,
            hideOnScroll,
            height,
            color,
        ],
    }),

    BaseVuetifyImage: new BaseVuetifyImage(),


    BaseBtn: new BaseComponent({
        displayIcon: "mdi-gesture-tap-button",
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
        displayIcon: "mdi-link",
        componentName: "BaseLink",
        displayName: 'Link',
        props: [
            openInNewTab,
            href,
            color
        ],
    }),

    BaseAvatar: new BaseComponent({
        displayIcon: "mdi-account-circle-outline",
        componentName: "BaseAvatar",
        displayName: 'Avatar',
        props: [
            iconDark,
            icon,
            color,
            outlined,
            iconSize,
        ],
    }),

    BaseAvatarCard: new BaseComponent({
        displayIcon: "mdi-card-account-details-outline",
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

    BaseBody: new BaseBody(),

    BaseDivider: new BaseComponent({
        displayIcon: "mdi-vector-line",
        componentName: "BaseDivider",
        displayName: 'Divider',
        props: [
            color,
            dense,
        ],
    }),

    BaseIcon: new BaseComponent({
        displayIcon: "mdi-emoticon-happy-outline",
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
        displayIcon: "mdi-book-information-variant",
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
        displayIcon: "mdi-format-header-increase",
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
        displayIcon: "mdi-form-textbox",
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
        displayIcon: "mdi-form-dropdown",
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
        displayIcon: "mdi-keyboard-space",
        componentName: "BaseSpacer",
        displayName: 'Spacer',
    }),

    BaseTabs: new BaseComponent({
        displayIcon: "mdi-table-border",
        componentName: "BaseTabs",
        displayName: 'Tabs',
    }),

    BaseTab: new BaseComponent({
        displayIcon: "mdi-tab-unselected",
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
