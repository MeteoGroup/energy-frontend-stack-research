import React from "react";
import ReactDOM from "react-dom";


export default class ReactWidgetBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleBtnText: "hide"
        };
    }


    remove(widgetId, widgetName) {
        var eventData = { widgetId: widgetId, widgetName: widgetName },
            event = new CustomEvent("remove-widget", { detail: eventData });
        document.body.dispatchEvent(event);
    }


    toggleGraph() {
        let el = this.refs.graph;
        let visible = !el.isVisible();
        el.setVisibility(visible);
        this.setState({
            toggleBtnText: (visible) ? "hide" : "show"
        });
    }

}

ReactWidgetBase.propTypes = {
    widgetId: React.PropTypes.number.isRequired
}
