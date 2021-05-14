import PanelProp from "./props/types/PanelProp";
import properties from "./props";

const panelMargin = new PanelProp({
    displayName: "Margin",
    props: [
        properties.spaceMargin.getMargin("all"),
        properties.spaceMargin.getMargin("left"),
        properties.spaceMargin.getMargin("right"),
        properties.spaceMargin.getMargin("top"),
        properties.spaceMargin.getMargin("bottom"),
    ]
})

const panelPadding = new PanelProp({
    displayName: "Padding",
    props: [
        properties.spacePadding.getPadding("all"),
        properties.spacePadding.getPadding("left"),
        properties.spacePadding.getPadding("right"),
        properties.spacePadding.getPadding("top"),
        properties.spacePadding.getPadding("bottom"),
    ]
})

export default class BaseComponent {
    constructor({ displayName, props } = {}) {
        this.displayName = displayName;

        if (props) {
            this.customProps = props;
        }
    }

    get props() {
        return [
            properties.hidden,
            panelMargin,
            panelPadding,
            ...this.customProps
        ]
    }

    get customProps() {
        return this._customProps || [];
    }

    set customProps(val) {
        this._customProps = val;
    }
}
