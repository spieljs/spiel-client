import { VNode } from "picodom";

export interface Routers {
    path: string;
    view: any;
    routers?: Array<{[Router in keyof Routers] :any}>;
    propsState: any;
    store?: any;
}

export interface ConfigRouters {
    default?: string;
    useHash: boolean;
    hash?: string;
    store?: any;
    routers?: Array<{[Router in keyof Routers] :any}>;
}

export type States = string;