import {h, JSXElements, render, srouter, State} from "../../../src";

export class TestPage2 {
    public state = {
        title: "Seriously",
    };

    public view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title} {state.params.number}</h1>
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

export const testPage2 = new TestPage2();
