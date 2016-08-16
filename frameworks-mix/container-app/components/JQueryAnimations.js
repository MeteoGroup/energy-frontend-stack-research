import React from "react";
import ReactDOM from "react-dom";


export default class JQueryAnimations extends React.Component {


    constructor(props) {
        super(props);
        this.runs = false;
    }


    runAnimations() {
        let body = $("body");
        let top = 0;
        for (let i = 0; i < 60; i++) {
            let delay = i * 100;
            this.addBoxMovingBox(body, top, delay);
            top += 10;
        }
    }


    addBoxMovingBox(container, top, delay) {
        setTimeout(() => {
            let el = $("<div style='position:absolute; width:10px; height:10px; background: #ff0; right:100%; top:"+ top +"px'></div>");
            container.append(el);
            el.animate({right: 0}, 2000, () => {
                el.remove();
            });
        }, delay);
    }


    render() {
        return (
            <div>
                <button onClick={this.runAnimations.bind(this)}>Run jQuery animations</button>
            </div>
        )
    }
}
