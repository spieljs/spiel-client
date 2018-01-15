import {h, Component, render, router, State, JSXElements} from '../../../src';

export class TestPage2 {
    state = {
        title: 'Seriously'
    }

    view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title} {state.params.number}</h1>
                <h2>{state.defaultProps}</h2>
                <button
                    onclick = {() => {
                        router.go('/home');
                    }}
                >go to root</button>
            </div>
        )
    }
}

export const testPage2 = new TestPage2();