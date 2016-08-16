/*
 * Function user to load multiple instances of an angular2 root component
 * into a single page.
 *
 * Notes: * Works only globally (on a 'document' element).
 *
 * @param {function} bootstrap
 * @param {array<object>} modulesData : array < { tagName: string, module: function } >
 * @returns {MainComponentLoader}
 *
 * Author: Adam Misiuda
 */
function MainComponentLoader(bootstrap, modulesData) {
    this.bootstrap = bootstrap;
    this.modulesData = modulesData;

    this.validateInputData();

      this.ready = [];
      this.queue = [];
      this.state = this.IS_FREE;
}


/*
* Function initialized all component tags already appended into DOM
*
* Note: It does not check if component has already been initialized
*       and tries to initialize all found elements
*
* @returns {void}
*/
MainComponentLoader.prototype.initAlreadyAppended = function() {
    this.state = this.IS_INITIALIZING;
    for (var idx = 0, n = this.modulesData.length; idx < n; idx++) {
        var data = this.modulesData[idx];
        this.queue = this.detachElementsIntoArray(data).concat(this.queue);
    }
    this.initNextInQueue();
};


/*
 * Function returns signal name which is triggered after all
 * components have been initialized
 *
 * @returns {String}
 */
 MainComponentLoader.prototype.getInitEndSignalName = function() {
    return this.INIT_COMPLETE_SIGNAL_NAME;
};


/*
 * Functions used to initialize new component. Used while previous component(s) has(have)
 * not been fully initialized will result in puting this component into avaiting queue.
 *
 * @param {Object} config {
     element: DOMElement [required],
     parentElem: DOMElement [required],
     tagName: string [required],
     module: function [required],
     pos: number [optional; default=0],
   }
 * @returns {void}
 */
 MainComponentLoader.prototype.addComponent = function(config) {
    var el = config.element;
    this.queue.push({
        parentElem: config.parentElem,
        pos: config.pos || 0,
        elem: el,
        __tagName: config.tagName,
        __module: config.module
    });
    if (this.state === this.IS_FREE) {
        this.initNewQueue();
    }
};


MainComponentLoader.prototype.getPos = function(el) {
    return [].indexOf.call(el.parentNode.children, el);
};


MainComponentLoader.prototype.validateInputData = function() {
    if (!(this.modulesData instanceof Array) || this.modulesData.length === 0) {
        throw this.MODULES_DATA_ARRAY_REQUIRED;
    }
    if (typeof this.bootstrap !== "function") {
        throw this.BOOTSTRAP_REQUIRED;
    }
    for (var idx = 0, n = this.modulesData.length; idx < n; idx++) {
        var data = this.modulesData[idx];
        if (typeof data.tagName !== "string" || data.tagName.trim() === "") {
            throw this.TAG_NAME_REQUIRED;
        }
        if (typeof data.module !== "function") {
            throw this.MODULE_REQUIRED;
        }
    }
};


MainComponentLoader.prototype.initNewQueue = function() {
    this.state = this.IS_INITIALIZING;
    for (var idx = 0, n = this.modulesData.length; idx < n; idx++) {
        var data = this.modulesData[idx];
        this.ready = this.detachElementsIntoArray(data).concat(this.ready);
    }
    this.initNextInQueue();
};


MainComponentLoader.prototype.detachElementsIntoArray = function(moduleData) {
    var tagName = moduleData.tagName,
        foundElems = document.getElementsByTagName(tagName),
        tmpArr = [];
    for (var idx = foundElems.length - 1; idx >= 0; idx--) {
        var el = foundElems[idx];
        if (el === undefined) {
            continue;
        }
        tmpArr.push({
            parentElem: el.parentNode,
            pos: this.getPos(el),
            elem: el,
            __tagName: tagName,
            __module: moduleData.module
        });
        el.parentNode.removeChild(el);
    }
    tmpArr.reverse();
    return tmpArr;
};


MainComponentLoader.prototype.initNextInQueue = function() {
    if (this.queue.length === 0) {
        this.insertReadyElems();
        return;
    }
    this.beforeComponentInit();
    var self = this,
        data = this.queue.splice(0, 1)[0];
    document.body.appendChild(data.elem);
    this.bootstrap(data.__module).then(function(m) {
        self.ready.push(data);
        data.elem.parentNode.removeChild(data.elem);
        self.initNextInQueue();
    });
};


MainComponentLoader.prototype.insertReadyElems = function() {
    this.state = this.IS_INSERTING;
    if (this.ready.length === 0) {
        this.state = this.IS_FREE;
        return;
    }
    this.insertReadyElemsIntoDOM();
    // check if que has not changed during elements insertion
    if (this.queue.length > 0) {
        this.initNewQueue();
        return;
    }
    this.state = this.IS_FREE;
    // trigger init end event
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(this.getInitEndSignalName(), true, false, null);
    this.INIT_COMPLETE_SIGNAL_CONTAINER.dispatchEvent(evt);
};


MainComponentLoader.prototype.insertReadyElemsIntoDOM = function() {
    this.beforeComponentsInsert();
    this.ready.reverse();
    while (this.ready.length > 0) {
        var data = this.ready.pop(),
            children = data.parentElem.children;
        (children.length <= data.pos)
            ? data.parentElem.appendChild(data.elem)
            : data.parentElem.insertBefore(data.elem, children[data.pos]);
    }
};


/*
 * Function introduced to allow injecting initialization delay
 * between consecutive elements for testing purposes
 */
MainComponentLoader.prototype.beforeComponentInit = function() {};
MainComponentLoader.prototype.beforeComponentsInsert = function() {};


MainComponentLoader.prototype.IS_FREE = 1 << 0;
MainComponentLoader.prototype.IS_INITIALIZING = 1 << 1;
MainComponentLoader.prototype.IS_INSERTING = 1 << 2;
MainComponentLoader.prototype.MODULES_DATA_ARRAY_REQUIRED = "[MainComponentLoader] Error: Modules data array is required!";
MainComponentLoader.prototype.TAG_NAME_REQUIRED = "[MainComponentLoader] Error: Tag name is required!";
MainComponentLoader.prototype.BOOTSTRAP_REQUIRED = "[MainComponentLoader] Error: Bootstrap function has not been provided!";
MainComponentLoader.prototype.MODULE_REQUIRED = "[MainComponentLoader] Error: Module function has not been provided!";
MainComponentLoader.prototype.INIT_COMPLETE_SIGNAL_CONTAINER = document;
MainComponentLoader.prototype.INIT_COMPLETE_SIGNAL_NAME = "components-init-complete";
