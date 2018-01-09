require("jsdom-global")();

import { render } from "../../src"
import { expect, assert } from "chai";

import {componentTest} from './mocks';

describe('Component', () => {
    beforeEach(()=> {
        render(componentTest.view, componentTest.state);
    });
    it('has to be created', ()=> {
        const parent = document.getElementsByTagName('span')[0];
        expect(parent.textContent).has.to.be.equal("This is a component");
    });
    it('has to exist its children', ()=> {
        const child = document.getElementById('child');     
        if(child) { 
            const element = child.firstElementChild 
            if(element) {
                expect(element.textContent).has.to.be.equal("And this is its child");}
            else {throw "The child component wasn't created"}
        } else {
            throw "child element doesn't exist";
        }
    });
})

