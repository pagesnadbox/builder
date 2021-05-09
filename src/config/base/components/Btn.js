import BaseComponent from "../BaseComponent";
import props from "../props"

class Btn extends BaseComponent { }

export default new Btn({
    displayName: 'Button',
    props: [
        props.hidden,
        // text,
        // sizeDef,
        // iconSrc,
        // dark,
        // textOnly,
        // openInNewTab,
        // {
        //     displayName: 'Full Width',
        //     propName: 'block',
        //     type: 'boolean',
        // },
        // {
        //     displayName: 'Full Width on Mobile',
        //     propName: 'blockOnMobile',
        //     type: 'boolean',
        // },
        // {
        //     displayName: 'Remove Shadow',
        //     propName: 'depressed',
        //     type: 'boolean',
        // },
        // {
        //     displayName: 'Tile',
        //     propName: 'tile',
        //     type: 'boolean',
        // },
        // {
        //     displayName: 'Outlined',
        //     propName: 'outlined',
        //     type: 'boolean',
        // },
        // color,
        // href,
        // {
        //     displayName: 'Min Width',
        //     propName: 'minWidth',
        //     type: 'string',
        // },

    ],
})