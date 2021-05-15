import properties from "./props";
export default class BaseComponent {
    get props() {
        return [
            properties.hidden,
            properties.customSpace.getSpace("Margin"),
            properties.customSpace.getSpace("Padding"),
            ...this.customProps
        ]
    }

    get customProps() {
        return this._customProps || [];
    }

    constructor({ displayName, props } = {}) {
        this.displayName = displayName;

        if (props) {
            this._customProps = props;
        }
    }
}
