import { h, Component, Page, State, VNode, Children, JSXElements, router } from '../../../src';

interface Show {
    value: string;
    onGo: Function;
}

export class TestPage5 implements Page {
    state = {
        text: 'This is a component'
    }

    view(state: State): JSXElements {
        return(
            <Show value={state.text} onGo={()=> router.go('/')}>
                <span>And this is its child</span>
            </Show>
        )
    }
}

function Show ({value, onGo}: Show, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id='child'>{children}</div>
            <button id="go-parent" onclick={() => router.go('/')}></button>
        </div>
    )
}

export const testPage5 = new TestPage5();