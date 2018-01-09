import { h, Component, Page, State, VNode, Children, JSXElements } from '../../src';

interface Show {
    value: string
}

export class ComponentTest implements Page {
    state = {
        text: 'This is a component'
    }

    view(state: State): JSXElements {
        return(
            <Show value={state.text}>
                <span>And this is its child</span>
            </Show>
        )
    }
}

function Show ({value}: Show, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id='child'>{children}</div>
        </div>
    )
}

export const componentTest = new ComponentTest();