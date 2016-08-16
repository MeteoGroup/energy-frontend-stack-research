import React from "react";
import ReactDOM from "react-dom";
import RiotLoader from "./components/RiotLoader";
import JQueryAnimations from "./components/JQueryAnimations";

require("./styles.css");


export default class Container extends React.Component {

    constructor(props) {
        super(props);
        this.loadedScripts = [];
        this.nextWidgetId = 1;
        this.state = {
            widgets: [
                { type: Container.REACT, name: "react-widget-1", title: "React widget 1", bundleUrl: "widgets/reactWidget1.bundle.js" },
                { type: Container.REACT, name: "react-widget-2", title: "React widget 2", bundleUrl: "widgets/reactWidget2.bundle.js" },
                { type: Container.RIOT, name: "riot-widget-1", title: "Riot widget 1", bundleUrl: "widgets/riot/RiotWidget1.js" },
                { type: Container.RIOT, name: "riot-widget-2", title: "Riot widget 2", bundleUrl: "widgets/riot/RiotWidget2.js" },
            ],
            logs: []
        };
    }


    componentDidMount() {
        this.startListeningForWidgetEvents();
    }


    startListeningForWidgetEvents() {
        let self = this;
        document.body.addEventListener("remove-widget", function(event) {
            var widgetId = event.detail.widgetId,
                widgetName = event.detail.widgetName;
            document.getElementById("widget" + widgetId).remove();
            self.log("Removed widget " + widgetName +"(" + widgetId + ")");
        });
    }


    getWidgetContainerEl(widgetId, widgetName) {
        let el = document.createElement("div");
        el.id = "widget" + widgetId;
        el.className = "widget";
        document.getElementById("widgets-container").appendChild(el);
        return el;
    }


    sendAddWidgetEvent(widgetName) {
        var widgetId = this.nextWidgetId++,
            containerEl = this.getWidgetContainerEl(widgetId, widgetName),
            event = new CustomEvent("add-" + widgetName, { detail: { widgetId: widgetId, container: containerEl } });
        document.body.dispatchEvent(event);
        this.log("Added widget ''" + widgetName +"'' (ID: " + widgetId + ")");
    }


    log(text, type) {
        switch (type) {
            case Container.LOG_ERROR:
                text = "<span class=\"error-log\">ERROR: " + text + "</span>";
                break;
            case Container.LOG_LOADING:
                text = "<span class=\"loading-log\">Loading\.\.\. (" + text + ")</span>";
                break;
        }
        this.state.logs.push(text);
        this.setState({
            logs: this.state.logs
        });
    }


    removeFromLoadedScripts(scriptUrl) {
        let pos = this.loadedScripts.indexOf(scriptUrl);
        if (pos > -1) {
            this.loadedScripts.splice(pos, 1);
        }
    }


    addWidget(framework, widgetName, scriptUrl) {
        switch (framework) {
            case Container.REACT:
                this.addReactWidget(widgetName, scriptUrl);
                break;
            case Container.RIOT:
                this.addRiotWidget(widgetName, scriptUrl);
                break;
            default:
                this.log("Unsupported framework '" + framework + "'!", Container.LOG_ERROR);
        }
    }


    addRiotWidget(widgetName, scriptUrl) {
        let widgetId = this.nextWidgetId++,
            containerEl = this.getWidgetContainerEl(widgetId, widgetName);
        if (this.isScriptAlreadyLoaded(scriptUrl)) {
            RiotLoader.addWidget(widgetId, widgetName, containerEl);
            this.log("Added widget ''" + widgetName +"'' (ID: " + widgetId + ")");
            return;
        }
        this.loadedScripts.push(scriptUrl);
        let self = this;
        self.log(scriptUrl, Container.LOG_LOADING);
        SystemJS.import(scriptUrl).then(function(m) {
            RiotLoader.addTagDefinition(m);
            self.log("Downloaded tag definition for '" + widgetName +"'");
            RiotLoader.addWidget(widgetId, widgetName, containerEl);
            self.log("Added widget ''" + widgetName +"'' (ID: " + widgetId + ")");
        }).catch(function(err) {
            self.removeFromLoadedScripts(scriptUrl);
            self.log(err, Container.LOG_ERROR);
        });
    }


    addReactWidget(widgetName, scriptUrl) {
        if (this.isScriptAlreadyLoaded(scriptUrl)) {
            this.sendAddWidgetEvent(widgetName);
            return;
        }
        var self = this,
            observable = this.loadScript(scriptUrl);
        observable.subscribe(
            function(value) {
                self.sendAddWidgetEvent(widgetName);
            },
            function(err) {
                self.removeFromLoadedScripts(scriptUrl);
                this.log(err, Container.LOG_ERROR);
            },
            function() {}
        );
    }


    isScriptAlreadyLoaded(scriptUrl) {
        return this.loadedScripts.indexOf(scriptUrl) > -1;
    }


    loadScript(scriptUrl, scriptType) {
        this.loadedScripts.push(scriptUrl);
        return Rx.Observable.create(function(subscriber) {
            var scriptEl = document.createElement("script");
            scriptEl.type = scriptType !== undefined ? scriptType : "text/javascript";
            scriptEl.src = scriptUrl;
            scriptEl.charset = "utf-8";

            if (scriptEl.readyState) {  //IE
                scriptEl.onreadystatechange = function(){
                    subscriber.next("aaaaaaa");
                    subscriber.compleonCompleted();
                    subscriber.dispose();
                    console.log("Ready");
                };
            } else {  //Others
                scriptEl.onload = function(){
                  subscriber.next("bbbbbbb");
                  subscriber.onCompleted();
                  subscriber.dispose();
                  console.log("Ready");
                };
            }

            document.body.appendChild(scriptEl);
        });
    };


    clearLogs() {
        this.setState({
            logs: []
        });
    }


    render() {
        let self = this;
        return (
            <div>
                <div className="widgetMenu">
                    <JQueryAnimations></JQueryAnimations>
                    {this.state.widgets.map(function(widget) {
                        return (
                          <div className="widget-add" key={widget.name}>
                              <img src={"src/icon-" + widget.type + ".png"} />
                              <span className="widget-name">{widget.title}</span>
                              <i
                                className="fa fa-plus"
                                onClick={self.addWidget.bind(self, widget.type, widget.name, widget.bundleUrl)}>
                              </i>
                          </div>
                        )
                    })}
                </div>
                <div id="logs">
                    <span>Console {(() => {
                        if (this.state.logs.length > 0) {
                          return <span onClick={this.clearLogs.bind(this)}>(clear)</span>
                        }
                    })()}</span>
                    <div>
                      {this.state.logs.map(function(log, idx) {
                          return <div key={"log-" + idx} dangerouslySetInnerHTML={{__html: log}}></div>
                      })}
                    </div>
                </div>
            </div>
        )
    }
}


Container.REACT = "react";
Container.RIOT = "riot";
Container.LOG_LOADING = "loading";
Container.LOG_ERROR = "error";


ReactDOM.render(<Container />, document.getElementById('panel'));
