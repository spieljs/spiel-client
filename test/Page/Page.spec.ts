import { assert, expect } from "chai";
import { h, patch, VNode} from "../../src";

import {pageTest} from "./mocks";

describe("Page", () => {
    let nodes: VNode<any>;
    before(() => {
        const node = h("div", {});
        const elm = document.createElement("div");
        elm.setAttribute("id", "app");
        document.body.appendChild(elm);
        patch(node, document.getElementById("app"));
        nodes = h(pageTest.view, pageTest.state);
    });

    it("has to be created", () => {
        const title: any = nodes.children.find((node: any) => node.nodeName === "h1");
        expect(title.children[0]).has.to.be.equal("Hello");
    });

    it("has to change the title", () => {
        const button: any = nodes.children.find((node: any) => node.nodeName === "button");
        button.attributes.onclick();
        nodes = h(pageTest.view, pageTest.state);
        const title: any = nodes.children.find((node: any) => node.nodeName === "h1");
        expect(title.children[0]).has.to.be.equal("Hello World");
    });
});
