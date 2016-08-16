require("./widget-header.js");
require("./graph.js");

<riot-widget-2>
    <widget-header wid={opts.wid} title="Riot widget 2"></widget-header>
    <graph></graph>

    <style scoped>
        :scope {
            background: #fff;
            color: #B71C1C;
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
        :scope .fa-close {
            color: #FFEBEE !important;
        }
        :scope .fa-close:hover {
            color: #B71C1C !important;
        }
    </style>

    <script>
    this.widgetName = "riot-widget-2";
    remove(e) {
        var eventData = { widgetId: this.opts.wid, widgetName: this.widgetName },
            event = new CustomEvent("remove-widget", { detail: eventData });
        document.body.dispatchEvent(event);
    }
    </script>
</riot-widget-2>
