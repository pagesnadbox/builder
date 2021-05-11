import properties from "./props";

export default class BaseComponent {
    constructor({ displayName, props }) {
        this.displayName = displayName;
        this.props = [
            properties.hidden,
            ...props
        ];
    }
}
