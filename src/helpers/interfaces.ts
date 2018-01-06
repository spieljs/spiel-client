import {VNode} from "picodom";

export type Keys = string
export type State = {[k in Keys]: any}
export type View = (state: State) => VNode<any>

export interface Page {
    state: State,
    view: View
}

export interface Routers {
    path: string;
    page: Page;
    routers?: Array<{[Router in keyof Routers] :any}>;
    store?: any;
}

export interface ConfigRouters {
    default?: string;
    notFound?: Page;
    useHash: boolean;
    hash?: string;
    store?: any;
    routers?: Array<{[Router in keyof Routers] :any}>;
}