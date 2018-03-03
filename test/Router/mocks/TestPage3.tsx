import {u, Component, render, srouter, State, JSXElements } from '../../../src';

export class TestPage3 {
    state = {
        title: 'Really'
    }

    view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title} {state.params.word} {state.params.number} {state.query}</h1>
                <h2>{state.defaultProps}</h2>
                <button
                    onclick = {() => {
                        srouter.go('/home');
                    }}
                >go to root</button>
            </div>
        )
    }
}

export const testPage3 = new TestPage3();
