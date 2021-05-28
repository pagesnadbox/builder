export default class BaseProp {
    constructor({ type, propName, displayName, defaultValue, value }, options = {}) {
        this.type = type;
        this.propName = propName;
        this.displayName = displayName;
        this.defaultValue = defaultValue;
        this.value = value;

        this.options = options;
    }
}