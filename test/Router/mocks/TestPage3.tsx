import {h, JSXElements, render, srouter, State } from "../../../src";

export class TestPage3 {
    public state = {
        title: "Really",
    };

    public view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title} {state.params.word} {state.params.number} {state.query}</h1>
                <h2>{state.defaultProps}</h2>
                <button
                    onclick = {() => {
                        srouter.go("/home");
                    }}
                >go to root</button>
            </div>
        );
    }
}

export const testPage3 = new TestPage3();
