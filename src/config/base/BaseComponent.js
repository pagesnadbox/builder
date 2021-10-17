import properties from "./props";

const divider = {
    displayName: '',
    type: 'divider',
}

const label = (label) => ({
    displayName: label,
    type: 'label',
})
export default class BaseComponent {
    get props() {
        return [
            properties.hidden,
            ...this.customProps
        ]
    }

    get alignProps() {
        return [
            label("Margin"),
            properties.customSpace.getSpace("marginTop", "Top"),
            properties.customSpace.getSpace("marginRight", "Right"),
            properties.customSpace.getSpace("marginBottom", "Bottom"),
            properties.customSpace.getSpace("marginLeft", "Left"),
            divider,
            label("Padding"),
            properties.customSpace.getSpace("paddingTop", "Top"),
            properties.customSpace.getSpace("paddingRight", "Right"),
            properties.customSpace.getSpace("paddingBottom", "Bottom"),
            properties.customSpace.getSpace("paddingLeft", "Left"),
        ]
    }

    get customProps() {
        return this._customProps || [];
    }

    constructor({ displayName, componentName, props, displayIcon } = {}) {
        this.displayName = displayName;
        this.displayIcon = displayIcon;
        this.componentName = componentName;

        if (props) {
            this._customProps = props;
        }
    }
}
