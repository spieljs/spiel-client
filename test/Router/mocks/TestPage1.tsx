import {h, Component, render, router, State, JSXElements } from '../../../src';

export class TestPage1 {
    state = {
        title: "Hello world"
    }

    view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title}</h1>
                <button id ='child'
                    onclick = {() => {
                        router.go('/home/child/5');
                    }}
                >go to child</button>
                <button id='grandchild'
                    onclick = {() => {
                        router.go('/home/child/2/child2/test?state=good');
                    }}
                >go to child 2</button>
                <button id='brother'
                    onclick = {() => {
                        router.go('/home/brother');
                    }}
                >go to child brother</button>
                <button id='page-component'
                    onclick = {() => {
                        router.go('/child');
                    }}
                >go to child with component</button>
            </div>
        )
    }
}

export const testPage1 = new TestPage1();