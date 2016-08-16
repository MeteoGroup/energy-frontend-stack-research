require("./widget-header.js");
require("./graph.js");


<riot-widget-1>
    <widget-header wid={opts.wid} title="Riot widget 1"></widget-header>
    <graph></graph>

    <style scoped>
        :scope {
            background: #B71C1C;
            color: #fff;
            display: inline-block;
        }
        rect {
            fill: none;
            pointer-events: all;
        }
        circle {
            fill: none;
            stroke-width: 2.5px;
        }
    </style>

    <script>
    this.widgetName = "riot-widget-1";
    remove(e) {
        var eventData = { widgetId: this.opts.wid, widgetName: this.widgetName },
            event = new CustomEvent("remove-widget", { detail: eventData });
        document.body.dispatchEvent(event);
    }
    </script>
</riot-widget-1>