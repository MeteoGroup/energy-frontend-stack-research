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
var WidgetA = (function () {
    function WidgetA(elementRef) {
        this.elementRef = elementRef;
    }
    WidgetA.prototype.onClick = function () {
        var styles = this.elementRef.nativeElement.style, currentOpacity = parseFloat(styles.opacity), newOpacity = currentOpacity !== 0.5 ? 0.5 : 1;
        styles.opacity = newOpacity;
        styles.filter = "alpha(opacity=" + (newOpacity * 100) + ")";
    };
    WidgetA = __decorate([
        core_1.Component({
            selector: "widget-a",
            template: "<div (click)=\"onClick()\"><h1>Widget A</h1></div>",
            styles: ["\n        div {\n            cursor: pointer;\n            color: #fff;\n            padding: 10px 20px;\n            margin: 10px;\n            display: inline-block;\n            background: #8BC34A;\n            border: 1px solid #8BC34A;\n        }"
            ],
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], WidgetA);
    return WidgetA;
}());
exports.WidgetA = WidgetA;
//# sourceMappingURL=WidgetA.js.map