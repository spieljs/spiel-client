import { router } from "../../src";
import { expect, assert } from "chai";

import {configDefault, configRoutersHash} from './configs';

describe('Router', ()=> {
    describe('with default', () => {
        before(() => {
            router.setRouters(configDefault);
        });

        it('has to go to "#/" without default path', (done)=>{
            setTimeout(() => {
                expect(window.location.hash).has.to.be.equal('#/');
                done();
            });
        });

        it('has to create the component testPage1', () => {
            const element = document.getElementsByTagName('h1')[0];
            expect(element.textContent).has.to.be.equal('Hello world');
        });

        it('has to go to child page', (done) => {
            const button = document.getElementById('page-component');
            if (button) button.click();
            setTimeout(() => {
                const title = document.getElementsByTagName('h1')[0];
                expect(window.location.hash).has.to.be.equal('#/child');
                expect(title).has.not.to.be.equals('Hello world');
                done();
            });
        });

        it('has to create the page child and its components', () => {
            const child = document.getElementById('child');
            if(child) {
                const component = child.getElementsByTagName('span')[0];
                if(component) {expect(component.textContent).has.to.be.equal("And this is its child")}
                else {throw "The child component wasn't created"}
            } else {
                throw "The component wasn't created"
            }
        });

        it('has to go to parent page', (done) => {
            const button = document.getElementById('go-parent');
            if(button) button.click();
            setTimeout(()=> {
                expect(window.location.hash).has.to.be.equal('#/');
                done();
            })
        });

        after(()=> {
            router.destroy();
            window.location.hash = '';
        });
    });
    
    describe("with settings", () => {
        before(() => {
            router.setRouters(configRoutersHash);
        });
    
        it('has to go to home page', (done) => {
            setTimeout(() => {
                const title = document.getElementsByTagName('h1')[0];
                expect(window.location.hash).has.to.be.equal('#!/home');
                expect(title.textContent).has.to.be.equal('Hello world');
                done();
            });
        });

        it('has to works the generic hooks and page hooks', (done) => {
            const button = document.getElementById('child');
            if (button) button.click();
            setTimeout(() => {
                const title = document.getElementsByTagName('h1')[0];
                if(title) expect(title.textContent).has.to.be.equal('Seriously 9');
                done();
            });
        });

        it('has to go to root page from testpage3', (done) => {
            const button = document.getElementsByTagName('button')[0];
            if(button) button.click();
            setTimeout(()=> {
                const title = document.getElementsByTagName('h1')[0];
                expect(window.location.hash).has.to.be.equal('#!/home');
                expect(title.textContent).has.to.be.equal('Hello world');
                done();
            })
        });

        it('has to get two parameters', (done) => {
            const button = document.getElementById('grandchild');
            if(button) button.click();
            setTimeout(()=> {
                const title = document.getElementsByTagName('h1')[0];
                expect(title.textContent).has.to.be.equal('Really test 4');
                router.go('/home');
                done();
            })
        });
        
        it('has to go to brother page', (done) => {
            const button = document.getElementById('brother');
            if(button) button.click();
            setTimeout(()=> {
                const title = document.getElementsByTagName('h1')[0];
                expect(title.textContent).has.to.be.equal('Hello brother');
                done();
            })
        });

        it('has to change the title in brother page', () => {
            const button = document.getElementsByTagName('button')[0];
            if(button) button.click();
            const title = document.getElementsByTagName('h1')[0];
            expect(title.textContent).has.to.be.equal('Yes brother');
        });

        it('has to go to root page from testpage4', (done) => {
            const button = document.getElementsByTagName('button')[1];
            if(button) button.click();
            setTimeout(()=> {
                const title = document.getElementsByTagName('h1')[0];
                expect(window.location.hash).has.to.be.equal('#!/home');
                expect(title.textContent).has.to.be.equal('Hello world');
                done();
            })
        });

        it('has to go to not found page', (done) => {
            router.go('/home/chil');
            setTimeout(()=> {
                const title = document.getElementsByTagName('h1')[0];
                expect(window.location.hash).has.to.be.equal('#!/not-found');
                expect(title.textContent).has.to.be.equal('Page not found sorry');
                done();
            })
        });

        after(()=> {
            router.destroy();
            window.location.hash = '';
        });
    });
    
});