import React from "react";
import ReactDOM from "react-dom";
import Graph from "./components/Graph";
import ReactWidgetBase from "./components/ReactWidgetBase";

require("./styles.css");
require("./styles-widget-2.css");


export default class ReactWidget2 extends ReactWidgetBase {

    render() {
        return (
            <div className={"react-widget " + ReactWidget2.widgetName}>
                <div className="widget-title">
                    <i
                      className="fa fa-close"
                      onClick={this.remove.bind(this, this.props.widgetId, ReactWidget2.widgetName)}
                      title="Remove widget">
                    </i>
                    <div>{ReactWidget2.widgetName}</div>
                    <div>ID: {this.props.widgetId}</div>
                </div>
                <div className="toggle-btn" ref="toggle-btn" onClick={this.toggleGraph.bind(this)}>{this.state.toggleBtnText}</div>
                <Graph ref="graph" width={300} height={150} />
            </div>
        )
    }
}


ReactWidget2.widgetName = "react-widget-2";


document.body.addEventListener("add-react-widget-2", function(event) {
    var containerEl = event.detail.container,
        widgetId = event.detail.widgetId;
    ReactDOM.render(<ReactWidget2 widgetId={widgetId} />, containerEl);
});
