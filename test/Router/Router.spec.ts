require("jsdom-global")();

import { router } from "../../src";
import { expect, assert } from "chai";

import {configDefault} from './configs';

describe('Router default', ()=> {
    beforeEach(() => {
        router.setRouters(configDefault);
    });
    it('has to go to "#/" without default path', ()=>{
        expect(window.location.hash).has.to.be.equal('#/');
    });
    it('has to create the component testPage1', () => {
        const element = document.getElementsByTagName('h1')[0];
        expect(element.textContent).has.to.be.equal('Hello world');
    });
    it('has to go to child page', () => {
        const button = document.getElementById('page-component');
        if (button) button.click();
        expect(window.location.hash).has.to.be.equal('#/child');
    });
    it('has to create the page child and its components', () => {
        const button = document.getElementById('page-component');
        if (button) button.click();
        const child = document.getElementById('child');
        if(child) {
            const component = child.getElementsByTagName('span')[0];
            if(component) {expect(component.textContent).has.to.be.equal("And this is its child")}
            else {throw "The child component wasn't created"}
        } else {
            throw "The component wasn't created"
        }
    });
    it('has to go to parent page', () => {
        router.go('/child');
        const button = document.getElementById('go-parent');
        if(button) button.click();
        expect(window.location.hash).has.to.be.equal('#/');
    })
});
