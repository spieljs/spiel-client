import { assert, expect } from "chai";
import { patch, render, srouter, State, VNode} from "../../src";

import { configDefault, configSettings } from "./configs";
import { testPage1 } from "./mocks/TestPage1";
import { testPage2 } from "./mocks/TestPage2";
import { testPage4 } from "./mocks/TestPage4";

describe("Router", () => {
  describe("with default", () => {
    before(() => {
      srouter.setRouters(configDefault).resolve();
    });

    it("has to go to '#/' without default path", (done) => {
      setTimeout(() => {
        expect(window.location.hash).has.to.be.equal("#/");
        done();
      });
    });

    it("has to create the component testPage1", () => {
      const element = document.getElementsByTagName("h1")[0];
      expect(element.textContent).has.to.be.equal("Hello world");
    });

    it("has to go to child page", (done) => {
      const button = document.getElementById("page-component");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        expect(window.location.hash).has.to.be.equal("#/child");
        expect(title).has.not.to.be.equals("Hello world");
        done();
      });
    });

    it("has to create the page child and its components", () => {
      const child = document.getElementById("child");
      if (child) {
        const component = child.getElementsByTagName("span")[0];
        if (component) { expect(component.textContent).has.to.be.equal("And this is its child");
      } else { throw new Error("The child component wasn't created"); }
      } else {
        throw new Error("The component wasn't created");
      }
    });

    it("has to go to parent page", (done) => {
      const button = document.getElementById("go-parent");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        expect(window.location.hash).has.to.be.equal("#/");
        done();
      });
    });

    after(() => {
      srouter.router.destroy();
      window.location.hash = "";
    });
  });

  describe("with settings", () => {
    before(() => {
      srouter.setRouters(configSettings).resolve();
    });

    it("has to go to home page", (done) => {
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        expect(window.location.hash).has.to.be.equal("#!/home");
        expect(title.textContent).has.to.be.equal("Hello world");
        expect(defaultProps.textContent).has.to.be.equal("default");
        done();
      });
    });

    it("has to works the generic hooks and page hooks", (done) => {
      const button = document.getElementById("child");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        if (title) {
          expect(title.textContent).has.to.be.equal("Seriously 9");
        }
        expect(defaultProps.textContent).has.to.be.equal("default");
        done();
      });
    });

    it("has to go to root page from testpage3", (done) => {
      const button = document.getElementsByTagName("button")[0];
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        expect(window.location.hash).has.to.be.equal("#!/home");
        expect(title.textContent).has.to.be.equal("Hello world");
        expect(defaultProps.textContent).has.to.be.equal("default");
        done();
      });
    });

    it("has to get two parameters", (done) => {
      const button = document.getElementById("grandchild");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        expect(title.textContent).has.to.be.equal("Really test 4 query=really good");
        expect(defaultProps.textContent).has.to.be.equal("default");
        srouter.go("/home");
        done();
      });
    });

    it("has to go to brother page", (done) => {
      const button = document.getElementById("brother");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        srouter.updatePageLinks();
        expect(title.textContent).has.to.be.equal("Hello brother");
        expect(defaultProps.textContent).has.to.be.equal("my own prop");
        done();
      });
    });

    it("has to change the title in brother page", () => {
      const button = document.getElementsByTagName("button")[0];
      if (button) {
        button.click();
      }
      const title = document.getElementsByTagName("h1")[0];
      expect(title.textContent).has.to.be.equal("Yes brother");
    });

    it("has to get the home link when getLinkPath is called", () => {
      const link = document.getElementsByTagName("a")[0];
      const url = srouter.router.getLinkPath(link);
      expect(url).has.to.be.equal("/home");
    });

    it("has to go to root page from testpage4", (done) => {
      const link = document.getElementsByTagName("a")[0];
      if (link) {
        link.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        expect(window.location.hash).has.to.be.equal("#!/home");
        expect(title.textContent).has.to.be.equal("Hello world");
        done();
      });
    });

    it("has to go to not found page", (done) => {
      srouter.go("/home/chil");
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        expect(window.location.hash).has.to.be.equal("#!/not-found");
        expect(title.textContent).has.to.be.equal("Page not found sorry");
        done();
      }, 100);
    });

    after(() => {
      srouter.router.destroy();
      window.location.hash = "";
    });
  });

  describe("without hash", () => {
    before(() => {
      configSettings.useHash = false;
      srouter.setRouters(configSettings).resolve();
      srouter.go("/");
    });

    it("has not to have any hash", (done) => {
      setTimeout(() => {
        expect(window.location.hash).has.to.be.empty;
        done();
      });
    });

    it("has to go to default page", () => {
      const title = document.getElementsByTagName("h1")[0];
      expect(window.location.pathname).has.to.be.equal("/home");
      expect(title.textContent).has.to.be.equal("Hello world");
    });

    after(() => {
      srouter.router.destroy();
    });
  });

  describe("manual", () => {
    before(() => {
      srouter.setRouters({ rootPath: "http://localhost:9876/" });
    });

    it("has to add a route", (done) => {
      srouter.router.on("/child/:number", (params) => {
        const state: State = {};
        Object.assign(state, testPage2.state);
        state.params = params;
        render(testPage2.view, state);
      });
      srouter.resolve();
      srouter.go("/child/6");
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        if (title) {
          expect(title.textContent).has.to.be.equal("Seriously 6");
        }
        done();
      });
    });

    it("has to create a default route", (done) => {
      srouter.router.pause();
      srouter.router.on(() => {
        document.body.appendChild(render(testPage1.view, testPage1.state));
      });
      srouter.router.resume();
      srouter.resolve();
      srouter.go("http://localhost:9876/", null, true);
      setTimeout(() => {
        const element = document.getElementsByTagName("h1")[0];
        expect(element.textContent).has.to.be.equal("Hello world");
        done();
      }, 100);
    });

    it("has to get the full link", () => {
      expect(srouter.router.link("/")).has.to.be.equal("http://localhost:9876/#/");
    });

    it("has to get the last route resolved", (done) => {
      srouter.go("/child/5");
      setTimeout(() => {
        expect(srouter.router.lastRouteResolved().url).has.to.be.equal("/child/5");
        done();
      });
    });

    it("has to generate an url", (done) => {
      srouter.router.on({
        "/child/:number": {
          as: "child", uses: (params, query) => {
            Object.assign(testPage2.state, params);
            render(testPage2.view, testPage2.state);
          },
        },
      });

      setTimeout(() => {
        const path = srouter.router.generate("child", { number: 5 });
        expect(path).has.to.be.equal("#/child/5");
        done();
      });
    });
  });
});
