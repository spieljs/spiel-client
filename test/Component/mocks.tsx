import { Children, createNode, IPage, JSXElements, State, VNode } from "../../src";

interface IShow {
    value: string;
}

export class ComponentTest implements IPage {
    public state = {
        text: "This is a component",
    };

    public view(state: State): JSXElements {
        return(
            <Show value={state.text}>
                <span>And this is its child</span>
            </Show>
        );
    }

}

function Show({value}: IShow, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id="child">{children}</div>
        </div>
    );
}

export const componentTest = new ComponentTest();
