import {IConfigRouters} from "../../src";

import {genericHooks, hooks} from "./hooks";

import { notFound } from "./mocks/NotFoundPath";
import { testPage1 } from "./mocks/TestPage1";
import { testPage2 } from "./mocks/TestPage2";
import { testPage3 } from "./mocks/TestPage3";
import { testPage4 } from "./mocks/TestPage4";
import { testPage5 } from "./mocks/TestPage5";

export const configDefault: IConfigRouters = {
    routers: [{
        page: testPage1,
        path: "/",
        routers: [{
            page: testPage5,
            path: "/child",
        }],
    }],
};

export const configSettings: IConfigRouters = {
    default: "/home",
    defaultProps: "default",
    genericHooks,
    hash: "#!",
    notFound: true,
    notFoundPath: "/not-found",
    rootPath: "http://localhost:9876/",
    routers: [{
        page: testPage1,
        path: "/home",
        routers: [{
            alias: "child",
            hooks,
            page: testPage2,
            path: "/child/:number",
            routers: [{
                alias: "grandchild",
                page: testPage3,
                path: "/child2/:word",
            }],
        }, {
            defaultProps: "my own prop",
            page: testPage4,
            path: "/brother",
        }],
    },
    {
        page: notFound,
        path: "/not-found",
    }],
    useHash: true,
};
