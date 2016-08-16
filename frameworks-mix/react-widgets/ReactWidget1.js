import React from "react";
import ReactDOM from "react-dom";
import Graph from "./components/Graph";
import ReactWidgetBase from "./components/ReactWidgetBase";

require("./styles.css");


export default class ReactWidget1 extends ReactWidgetBase {

    render() {
        return (
            <div className={"react-widget widget-" + ReactWidget1.widgetName}>
                <div className="widget-title">
                    <i
                      className="fa fa-close"
                      onClick={this.remove.bind(this, this.props.widgetId, ReactWidget1.widgetName)}
                      title="Remove widget">
                    </i>
                    <div>{ReactWidget1.widgetName}</div>
                    <div>ID: {this.props.widgetId}</div>
                </div>
                <div className="toggle-btn" ref="toggle-btn" onClick={this.toggleGraph.bind(this)}>{this.state.toggleBtnText}</div>
                <Graph ref="graph" width={300} height={150} />
            </div>
        )
    }
}


ReactWidget1.widgetName = "react-widget-1";


document.body.addEventListener("add-react-widget-1", function(event) {
    var containerEl = event.detail.container,
        widgetId = event.detail.widgetId;
    ReactDOM.render(<ReactWidget1 widgetId={widgetId} />, containerEl);
});
