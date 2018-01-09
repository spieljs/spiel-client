import {h, Component, render, router, State, JSXElements } from '../../../src';

export class TestPage3 {
    state = {
        title: 'Really'
    }

    view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title} {state.params.word} {state.params.number}</h1>
                <button
                    onclick = {() => {
                        router.go('/home');
                    }}
                >go to root</button>
            </div>
        )
    }
}

export const testPage3 = new TestPage3();