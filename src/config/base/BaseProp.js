export default class BaseProp {
    constructor({
        type,
        enums,
        propName,
        displayName,
        defaultValue,
    }, options = {}
    ) {
        this.type = type;
        this.enums = enums
        this.propName = propName;
        this.displayName = displayName;
        this.defaultValue = defaultValue;

        this.options = options;
    }
}