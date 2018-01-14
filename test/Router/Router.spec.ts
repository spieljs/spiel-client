import { router, render, State, Params } from "../../src";
import { expect, assert } from "chai";

import {configDefault, configSettings} from './configs';
import { testPage2 } from "./mocks/TestPage2";
import { testPage1 } from "./mocks/TestPage1";

describe('Router', ()=> {
    describe('with default', () => {
        before(() => {
            router.setRouters(configDefault).resolve();
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
            router.setRouters(configSettings).resolve();
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
                expect(title.textContent).has.to.be.equal('Really test 4 state=good');
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

    describe('without hash', () => {
        before(() => {
            configSettings.useHash = false;
            router.setRouters(configSettings).resolve();
            router.go('/');
        });

        it('has not to have any hash', (done) => {
            setTimeout(() => {
                expect(window.location.hash).has.to.be.empty
                done();
            });
        });

        it('has to go to default page', () => {
            const title = document.getElementsByTagName('h1')[0];
            expect(window.location.pathname).has.to.be.equal('/home');
            expect(title.textContent).has.to.be.equal('Hello world');
        });

        after(()=> {
            router.destroy();
        });
    });

    describe('manual', () => {
        before(() => {
            router.setRouters({rootPath: 'http://localhost:9876/'});
        });

        it('has to add a route', (done) => {
            router.on('/child/:number', (params) => {
                const state: State = {};
                Object.assign(state, testPage2.state);
                state.params = params;
                render(testPage2.view, state);
            });
            router.resolve();
            router.go('/child/6');
            setTimeout(() => {
                const title = document.getElementsByTagName('h1')[0];
                if(title) expect(title.textContent).has.to.be.equal('Seriously 6');
                done();
            });
        });

        it('has to create a default route', (done)=> {
            router.pause();
            router.onDefault(() => {
                render(testPage1.view, testPage1.state);
            });
            router.resume();
            router.resolve();
            router.go('http://localhost:9876/', true);
            setTimeout(() => {
                const element = document.getElementsByTagName('h1')[0];
                expect(element.textContent).has.to.be.equal('Hello world');
                done();
            });
        });

        it('has to get the full link', () => {
            expect(router.link('/')).has.to.be.equal('http://localhost:9876/#/');
        });

        it('has to get the last route resolved', (done) => {
            router.go('/child/5');
            setTimeout(()=> {
                expect(router.lastRouteResolved().url).has.to.be.equal('/child/5');
                done();
            })
        });

        it('has to generate an url', () => {
            router.onMultiple({
                '/child/:number?answer=42': { 
                    as: 'child', uses: (params, query) => {} 
                }
            });
            const path = router.generate('child', {number: 5});
            expect(path).has.to.be.equal('#/child/5?answer=42');
        })
    })
});