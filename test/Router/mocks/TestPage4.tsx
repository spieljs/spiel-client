import {u, Component, render, State, JSXElements} from '../../../src';

export class TestPage4 {
    state = {
        title: 'Hello brother'
    }

    view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title}</h1>
                <h2>{state.defaultProps}</h2>
                <button
                    onclick ={() => {
                        state.title = 'Yes brother';
                        render(testPage4.view, state)
                    }}
                >Change Title</button>
                <a href='/home' data-navigo>go to root</a>
            </div>
        )
    }
}

export const testPage4 = new TestPage4();
