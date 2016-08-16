"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var WidgetB = (function () {
    function WidgetB() {
    }
    WidgetB.prototype.onClick = function () {
        var styles = this.textEl.nativeElement.style;
        styles.textDecoration = styles.textDecoration !== "underline" ? "underline" : "none";
    };
    __decorate([
        core_1.ViewChild("textEl"), 
        __metadata('design:type', Object)
    ], WidgetB.prototype, "textEl", void 0);
    WidgetB = __decorate([
        core_1.Component({
            selector: "widget-b",
            template: "<div (click)=\"onClick()\"><h1 #textEl>Widget B</h1></div>",
            styles: ["\n        div {\n            cursor: pointer;\n            color: #fff;\n            padding: 10px 20px;\n            margin: 10px;\n            display: inline-block;\n            background: #607D8B;\n            border: 1px solid #607D8B;\n        }"
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], WidgetB);
    return WidgetB;
}());
exports.WidgetB = WidgetB;
//# sourceMappingURL=WidgetB.js.map