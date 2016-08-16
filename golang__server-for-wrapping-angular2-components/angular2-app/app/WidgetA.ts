import { Component, ElementRef } from "@angular/core";

@Component({
    selector: "widget-a",
    template: "<div (click)=\"onClick()\"><h1>Widget A</h1></div>",
    styles: [`
        div {
            cursor: pointer;
            color: #fff;
            padding: 10px 20px;
            margin: 10px;
            display: inline-block;
            background: #8BC34A;
            border: 1px solid #8BC34A;
        }`
    ],
})

export class WidgetA {

    constructor(private elementRef:ElementRef) {}
    
    
    public onClick():void {
        var styles = this.elementRef.nativeElement.style,
            currentOpacity = parseFloat(styles.opacity),
            newOpacity = currentOpacity !== 0.5 ? 0.5 : 1;
        styles.opacity = newOpacity;
        styles.filter  = "alpha(opacity=" + (newOpacity * 100) +")";
    }
}
