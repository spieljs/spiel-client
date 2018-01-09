require("jsdom-global")();

import { render } from "../../src"
import { expect, assert } from "chai";

import {pageTest} from './mocks';

describe("Page", () => {
    beforeEach(()=> {
        render(pageTest.view, pageTest.state);
    });

    it("has to be created", ()=> {
        const title = document.body.getElementsByTagName("h1")[0];
        expect(title.textContent).has.to.be.equal("Hello");
    });

    it("has to change the title in onclick", ()=> {
        const button = document.body.getElementsByTagName("button")[0];
        button.click();
        const title = document.body.getElementsByTagName("h1")[0];
        expect(title.textContent).has.to.be.equal("Hello World")
    })
})