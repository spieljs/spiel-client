# Spiel Client

[![Travis CI](https://travis-ci.org/spieljs/spiel-client.svg?branch=master)](https://travis-ci.org/spieljs/spiel-client)
[![npm](https://img.shields.io/npm/v/spiel-client.svg)](https://www.npmjs.org/package/spiel-client)

Spiel client is a flexible and light frontend framework to make easier create a complex and modern applications for the client side. It joins two light but powerful libraries: [Ultradom](https://github.com/jorgebucaran/ultradom) and [Navigo](https://github.com/krasimir/navigo).

## Api documentation
* [Spiel client API](https://spieljs.github.io/spiel-client/)

## Examples
* [Simple Spiel Client Example](https://github.com/spiel-examples/simple-spiel-client-example)

## How use it

### First config you routes

```typescript
import {IConfigRouters} from "spiel-client";
import {genericHooks, hooks} from "./hooks";
import {page1, page2, page3, page4, notFound} from './Pages'

export const configSettings: IConfigRouters = {
    default: "/home",
    defaultProps: "default",
    genericHooks,
    hash: "#!",
    notFound: true,
    notFoundPath: "/not-found",
    rootPath: "http://localhost:9876/",
    routers: [{
        page: Page1,
        path: "/home",
        routers: [{
            alias: "child",
            hooks,
            page: Page2,
            path: "/child/:number",
            routers: [{
                alias: "grandchild",
                page: Page3,
                path: "/child2/:word",
            }],
        }, {
            defaultProps: "my own prop",
            page: Page4,
            path: "/brother",
        }],
    },
    {
        page: notFound,
        path: "/not-found",
    }],
    useHash: true,
};

srouter.setRouters(configDefault).resolve();
```

#### You can also use the navigo API directly:

```typescript

srouter.setRouters();

const router = srouter.router;
router.on({
  '/user/:id': {
    as: 'user', uses: (params, query) => {
      Object.assign(page2.state, params);
      render(page2.view, page2.state);
    }
  }
});
router.resolve();
```

#### Assign alias if you want generate links:

```typescript
const configDefault: IConfigRouters = {
    routers: [{
        alias: 'user'
        default: '/user'
        page: page1,
        path: '/user/:id',
    }]
};

srouter.setRouters(configDefault).resolve();
const router = srouter.router;
console.log(router.generate('user', {id: 4})); // #/user/4
```

### Pass object by url

You can pass object with `srouter.go` and recover it with `lastState` state property:

```tsx
export class TestPage4 {
    public state = {
        title: "Hello brother",
    };

    public view(state: State): JSXElements {
        return (
            <div>
                <h1>{state.title}</h1>
                <h2>{state.lastState}</h2>
                <button
                    onclick ={() => {
                        state.title = "Yes brother";
                        srouter.go("/home/brother", {title: state.title});
                        render(testPage4.view, state);
                    }}
                >Change Title</button>
                <a href="/home" data-navigo>go to root</a>
            </div>
        );
    }
}
```

#### Set your generic hooks for all the routes:

```typescript
export const genericHooks: IGenericHooks = {
    after: (params: Params) => {
        if (params && params.number) {
            params.number = +params.number + 2;
        }
    },
    before: (done: (suppress?: boolean) => void, params: Params) => {
        if (params && params.number) {
            params.number = +params.number + 2;
        }
        done();
    },
};
```

#### And your hooks for expecific route:

```typescript
export const hooks: IHooks = {
    after: (params: Params) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
    already: (params: Params) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
    before: (done: (suppress?: boolean) => void, params: Params) => {
        if (params) {
            params.number = +params.number + 2;
        }
        done();
    },
    leave: (params: Params) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
};  
```
### Create your page components

```tsx
import { Children, createNode, IPage, JSXElements, srouter, State, VNode } from "../../../src";

interface IShow {
    value: string;
    onGo: () => void;
}

export class Page5 implements IPage {
    public state = {
        text: "This is a component",
    };

    public view(state: State): JSXElements {
        return(
            <Show value={state.text} onGo={() => srouter.go("/")}>
                <span>And this is its child</span>
            </Show>
        );
    }
}

function Show({value, onGo}: IShow, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id="child">{children}</div>
            <button id="go-parent" onclick={() => srouter.go("/")}></button>
        </div>
    );
}

export const page5 = new page5();
```

**Note:** you need to export the singleton of the class and always import `createNode` to render the views

To know more about the views see more in [ultradom](https://github.com/jorgebucaran/ultradom).
All the ultradom functionalities like `patch`, `createNode` etc... are available in spiel-client

### Config your project

This is a tsconfig example:

```typescript
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "sourceMap": true,
        "strict": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "declaration": true,
        "outDir": "./lib",
        "rootDir": ".",
        "jsx": "react",
        "jsxFactory": "createNode"
    },
    "include": [
        "./src",
        "./example"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

Remember always to put `createNode` in the `jsxFactory` option.

### Test your code

Create your mocks:

```tsx
import { Children, createNode, IPage, JSXElements, State, VNode } from "../../src";

interface IShow {
    value: string;
}

export class ComponentTest implements IPage {
    public state = {
        text: "This is a component",
    };

    public view(state: State): JSXElements {
        return(
            <Show value={state.text}>
                <span>And this is its child</span>
            </Show>
        );
    }

}

function Show({value}: IShow, children: Children) {
    return (
        <div>
            <span>{value}</span>
            <div id="child">{children}</div>
        </div>
    );
}

export const componentTest = new ComponentTest();
```

and your file spec:

```typescript
import { assert, expect } from "chai";
import { createNode as u, patch, VNode} from "../../src";

import {componentTest} from "./mocks";

describe("Component", () => {
    let nodes: VNode<any>;
    before(() => {
        nodes = u(componentTest.view, componentTest.state);
    });
    it("has to be created", () => {
        const text: any = nodes.children.find((node: any) => node.nodeName === "span");
        expect(text.children[0]).has.to.be.equal("This is a component");
    });

    it("has to exist its children", () => {
        const child: any = nodes.children.find((node: any) => node.nodeName === "div");
        const text: any = child.children.find((node: any) => node.nodeName === "span");
        expect(text.children[0]).has.to.be.equal("And this is its child");
    });
});
```

## Make compatible with ES5 browsers

tsconfig.json:

```json
{
	"compilerOptions": {
		"target": "es5",
		"module": "commonjs",
		"sourceMap": true,
		"strict": true,
		"emitDecoratorMetadata": true,
		"experimentalDecorators": true,
		"declaration": true,
		"outDir": "./lib",
		"rootDir": ".",
		"jsx": "react",
		"jsxFactory": "createNode"
	},
	"include": [
		"./src",
		"./example"
	],
	"exclude": [
		"node_modules"
	]
}
```

In your code:
```typescript
import 'es6-shim'; // or every polyfill which you need
import { srouter, IConfigRouters } from 'spiel-client';
```

## Run Spiel Client tests

`npm test`

## License

Spiel Client is MIT licensed. See [license](LICENSE.md)
