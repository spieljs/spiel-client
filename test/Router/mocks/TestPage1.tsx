import {h, JSXElements, render, srouter, State } from "../../../src";

export class TestPage1 {
    public state = {
        title: "Hello world",
    };

    public view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title}</h1>
                <h2>{state.defaultProps}</h2>
                <button id ="child"
                    onclick = {() => {
                        srouter.go("/home/child/5");
                    }}
                >go to child</button>
                <button id="grandchild"
                    onclick = {() => {
                        srouter.go("/home/child/2/child2/test?query=really", {text: "good"});
                    }}
                >go to child 2</button>
                <button id="brother"
                    onclick = {() => {
                        srouter.go("/home/brother");
                    }}
                >go to child brother</button>
                <button id="page-component"
                    onclick = {() => {
                        srouter.go("/child");
                    }}
                >go to child with component</button>
            </div>
        );
    }
}

export const testPage1 = new TestPage1();
