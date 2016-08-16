/*
 * Author: Adam Misiuda
*/
var FIRST_COMPONENT_TAG_NAME = "square-component",
    SECOND_COMPONENT_TAG_NAME = "circle-component",
    INITIALIZED_FIRST_COMPONENT_HTML = "Square",
    INITIALIZED_SECOND_COMPONENT_HTML = "Circle";
    

function getFirstComponentLoader() {
    var moduleData = [{
        tagName: FIRST_COMPONENT_TAG_NAME,
        module: squareComponentModule
    }];
    return new MainComponentLoader(bootstrap, moduleData);
}


function getFirstAndSecondComponentsLoader() {
    return new MainComponentLoader(bootstrap, getFirstAndSecondModulesData());
}


function getFirstAndSecondModulesData() {
    return [{
        tagName: FIRST_COMPONENT_TAG_NAME,
        module: squareComponentModule
    },{
        tagName: SECOND_COMPONENT_TAG_NAME,
        module: circleComponentModule
    }];
}

/*
function getSecondComponentLoader() {
    var moduleData = [{
        tagName: SECOND_COMPONENT_TAG_NAME,
        module: circleComponentModule
    }];
    secondComponentLoader = new MainComponentLoader(bootstrap, moduleData);
    SECOND_COMPONENT_INIT_END_SIGNAL_NAME = secondComponentLoader.getInitEndSignalName();
    return secondComponentLoader;
}*/


function initSingleComponentTestDom() {
    setTestDomHtml(
        '<div>Test block</div>' +
        '<square-component id="1">Loading...</square-component>' +
        '<div id="inner-container">' +
            '<square-component id="2">Loading...</square-component>' +
            '<div>Test block 2</div>' +
        '</div>' +
        '<square-component id="3">Loading...</square-component>'
    );
}


function initMultipleComponentTestDom() {
    setTestDomHtml(
        '<div>Test block</div>' +
        '<circle-component id="s1">Loading...</circle-component>' +
        '<square-component id="f1">Loading...</square-component>' +
        '<div id="inner-container">' +
            '<square-component id="f2">Loading...</square-component>' +
            '<div>Test block 2</div>' +
            '<circle-component id="s2">Loading...</circle-component>' +
        '</div>' +
        '<square-component id="f3">Loading...</square-component>' +
        '<circle-component id="s3">Loading...</circle-component>'
    );
}


function clearTestDom() {
    setTestDomHtml("");
}


function setTestDomHtml(html) {
    document.getElementById("container").innerHTML = html;
}


function getPos(el) {
    return Array.prototype.indexOf.call(el.parentNode.children, el);
}


function sleep(msec) {
    var start = (new Date()).getTime();
    while(1) {
        var ts = (new Date()).getTime();
        if (start + msec <= ts) {
            break;
        }
    }
}


function waitForSignal(signalName) {
    return new SignalHandler(signalName);
}
function SignalHandler(signalName) {
    this.signalName = signalName;
    this.elem = null;
    return this;
}
SignalHandler.prototype.on = function(elem) {
    this.elem = elem;
    return this;
};
SignalHandler.prototype.then = function(callback) {
    var self = this;
    function callbackWrapper(e) {
        self.elem.removeEventListener(e.type, callbackWrapper);
        callback();
    }
    if (self.elem.addEventListener) {     // all browsers except IE before version 9
        self.elem.addEventListener(self.signalName, callbackWrapper, false);
    } else if (self.elem.attachEvent) {   // IE before version 9
        self.elem.attachEvent(self.signalName, callbackWrapper);
    }
};