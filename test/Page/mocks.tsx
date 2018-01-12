import {h, Component, render, State, Page, VNode} from '../../src';

export class PageTest implements Page {
    state: State = {
        title: "Hello"
    }

    view(state: State): VNode<any> {
        const changeTitle = () => {
            state.title = 'Hello World';
            render(pageTest.view, state);
        }

        return(
            <div>
                <h1>{state.title}</h1>
                <button onclick={() => changeTitle()}></button>
            </div>
        )
    }
}

export const pageTest = new PageTest();