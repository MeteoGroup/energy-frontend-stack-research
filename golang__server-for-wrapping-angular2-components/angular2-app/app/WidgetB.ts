import { Component, ViewChild } from "@angular/core";

@Component({
    selector: "widget-b",
    template: "<div (click)=\"onClick()\"><h1 #textEl>Widget B</h1></div>",
    styles: [`
        div {
            cursor: pointer;
            color: #fff;
            padding: 10px 20px;
            margin: 10px;
            display: inline-block;
            background: #607D8B;
            border: 1px solid #607D8B;
        }`
    ],
})

export class WidgetB {

    @ViewChild("textEl") textEl;
    
    
    constructor() {}
    
    
    public onClick():void {
        var styles = this.textEl.nativeElement.style;
        styles.textDecoration = styles.textDecoration !== "underline" ? "underline" : "none";
    }
}
