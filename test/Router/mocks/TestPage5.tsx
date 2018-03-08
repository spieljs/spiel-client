import { Children, h, IPage, JSXElements, srouter, State, VNode } from "../../../src";

interface IShow {
    value: string;
    onGo: () => void;
}

export class TestPage5 implements IPage {
    public state = {
        text: "This is a component",
    };

    public view(state: State): JSXElements {
        return(
            <Show value={state.text} onGo={() => srouter.go("/")}>
                <span>And this is its child</span>
            </Show>
        );
    }
}

function Show({value, onGo}: IShow, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id="child">{children}</div>
            <button id="go-parent" onclick={() => srouter.go("/")}></button>
        </div>
    );
}

export const testPage5 = new TestPage5();
