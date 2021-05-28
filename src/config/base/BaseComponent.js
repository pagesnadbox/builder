import properties from "./props";
export default class BaseComponent {
    get props() {
        return [
            properties.hidden,
            ...this.customProps
        ]
    }

    get alignProps() {
        return [
            properties.customSpace.getSpace("Margin"),
            properties.customSpace.getSpace("Padding"),
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
