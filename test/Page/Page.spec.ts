import { h, VNode, patch } from "../../src"
import { expect, assert } from "chai";

import {pageTest} from './mocks';

describe("Page", () => {
    let nodes: VNode<any>;
    before(()=> {
        const node = h("div", { id: "app"});
        patch(node, document.body);
        nodes = h(pageTest.view, pageTest.state);
    });

    it("has to be created", ()=> {
        const title: any = nodes.children.find((node: any) => node.nodeName === 'h1');
        expect(title.children[0]).has.to.be.equal("Hello");
    });

    it("has to change the title", ()=> {
        const button: any = nodes.children.find((node: any) => node.nodeName === 'button');
        button.attributes.onclick();
        nodes = h(pageTest.view, pageTest.state);
        const title: any = nodes.children.find((node: any) => node.nodeName === 'h1');
        expect(title.children[0]).has.to.be.equal("Hello World");
    })
})