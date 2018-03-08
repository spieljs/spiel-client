import { h, IPage, render, State, VNode} from "../../src";

export class PageTest implements IPage {
    public state: State = {
        title: "Hello",
    };

    public view(state: State): VNode<any> {
        const changeTitle = () => {
            state.title = "Hello World";
            document.body.appendChild(render(pageTest.view, state, document.getElementById("app")));
        };

        return(
            <div>
                <h1>{state.title}</h1>
                <button onclick={() => changeTitle()}></button>
            </div>
        );
    }
}

export const pageTest = new PageTest();
