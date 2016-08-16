function getPosition() {
    var pos = parseInt(document.getElementById("add-position").value);
    if (isNaN(pos)) {
        var msg = "Position is missing!";
        alert(msg);
        throw msg;
    }
    if (pos < 1) {
        pos = 1;
    }
    return pos - 1;
}

function addComponent() {
    var pos = getPosition(),
        tagName = document.getElementById("component").value,
        containerId = document.getElementById("add-containerId").value,
        container = document.getElementById(containerId),
        el = document.createElement(tagName),
        nodes = container.children,
        module = (tagName === "square-component") ? squareComponentModule : circleComponentModule;
    if (isNaN(pos) || pos < 0) {
        pos = nodes.length;
    }
    loader.addComponent({
        element: el,
        parentElem: container,
        tagName: tagName,
        module: module,
        pos: pos
    });
}

function validatePositionElem(elem) {
    var newValue = elem.value.trim();
    if (newValue !== "") {
        newValue = parseInt(newValue);
        newValue = isNaN(newValue) || newValue < 1 ? "" : newValue;
    }
    elem.value = newValue;
}


function clickAll(tagName) {
    var elems = document.getElementsByTagName(tagName),
        event = new Event("custom-click");
    for (var idx = 0, n = elems.length; idx < n; idx++)  {
        elems[idx].dispatchEvent(event);
    }
    setClickCounterTo(clickCounter + n);
}


function clickAllNTimes(tagName, times) {
    if (times > 0) {
        clickAll(tagName);
        setTimeout(clickAllNTimes.bind(null, tagName, times - 1), 60);
    }
}


function resetCounters() {
    var event = new Event("reset-click-counter")
    document.body.dispatchEvent(event);
    setClickCounterTo(0);
}


var clickCounter = 0;
function initListeners() {
    document.body.addEventListener('clicked', function(e) {
        setClickCounterTo(++clickCounter);
    });
}


function setClickCounterTo(counts) {
    var el = document.getElementById("clicks-counter");
    el.innerHTML = "Clicks count: <b>" + counts + "</b>";
    clickCounter = counts;
}


function startJqueryAnimations() {
    for (var idx = 0; idx < 40;) {
        idx++;
        startSingleJqueryBoxAnim(idx);
    }
}


function startSingleJqueryBoxAnim(idx) {
    var el = $("<div class=\"jquery-box\">Box no. " + idx +"</div>");
    setTimeout(function() {
        $("#jquery-box-container").append(el);
        setTimeout(function() {
            el.animate({left: '100%'}, 1000, function() {
                el.remove();
            });
        }, idx * 200);
    }, idx * 50);
}
