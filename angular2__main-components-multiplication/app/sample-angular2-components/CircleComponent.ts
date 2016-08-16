import {enableProdMode, Component, Input, ElementRef, Renderer} from "@angular/core";
import {GeometricalComponent} from "./GeometricalComponent";

//enableProdMode();

@Component({
    selector: "circle-component",
    template:
        `<span class="gc-content" (click)="customClick()">
            <div class="gc-title">Circle</div>
            <div class="gc-counter">{{counter}}</div>
        </span>`
})


export class CircleComponent extends GeometricalComponent {

    constructor(protected elementRef: ElementRef, protected renderer: Renderer) {
        super(elementRef, renderer);
    }


    public customClick() {
        let eventData = { details: "CIRCLE" },
            event = new CustomEvent("clicked", eventData);
        document.body.dispatchEvent(event);
    }
}
