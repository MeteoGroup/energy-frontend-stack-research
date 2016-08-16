import {ElementRef, Renderer} from "@angular/core";


export class GeometricalComponent {

    private counter:number = 0;


    constructor(protected elementRef: ElementRef, protected renderer: Renderer) {
        this.setRandomColour();
        //this.setListeners();
        this.setNativeListeners();
    }


    private setRandomColour():void {
        var R:number = Math.ceil(Math.random() * 200) + 55,
            G:number = Math.ceil(Math.random() * 200) + 55,
            B:number = Math.ceil(Math.random() * 200) + 55,
            colour:string = "rgb("+ R +", "+ G +","+ B +")";
        this.renderer.setElementStyle(this.elementRef.nativeElement, "backgroundColor", colour);
    }


    private setListeners() {
        this.renderer.listen(this.elementRef.nativeElement, "click", (event) => {
            this.onClick();
        });
        this.renderer.listen(this.elementRef.nativeElement, "custom-click", (event) => {
            this.onClick();
        });
        this.renderer.listen(document.body, "reset-click-counter", (event) => {
            this.counter = 0;
        });
    }


    private setNativeListeners() {
        this.elementRef.nativeElement.addEventListener("click", (event) => {
            this.onClick();
        });
        this.elementRef.nativeElement.addEventListener("custom-click", (event) => {
            this.onClick();
        });
        document.body.addEventListener("reset-click-counter", (event) => {
            this.counter = 0;
        });
    }


    private onClick() {
        this.setRandomColour();
        this.counter++;
    }
}
