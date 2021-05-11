export default class BaseProp {
    constructor({ type, propName, displayName, defaultValue }, options = {}) {
        this.type = type;
        this.propName = propName;
        this.displayName = displayName;
        this.defaultValue = defaultValue;

        this.options = options;
    }
}