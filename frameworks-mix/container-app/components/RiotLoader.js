export default class RiotLoader {}


RiotLoader.addTagDefinition = function(tagContent) {
    var el = document.createElement("script");
    el.type = "riot/tag";
    el.innerHTML = tagContent;
    document.body.appendChild(el);
}


RiotLoader.addWidget = function(widgetId, widgetName, containerEl) {
    let id = "wi" + widgetId;
    containerEl.innerHTML = "<" + widgetName + " id='" + id + "'></" + widgetName + ">";
    RiotLoader.mountWidget(id, widgetId);
}


RiotLoader.mountWidget = function(id, widgetId) {
    try {
        riot.mount("#" + id, {
            wid: widgetId
        });
    } catch (e) {
        console.log("E:", e);
    }
}
