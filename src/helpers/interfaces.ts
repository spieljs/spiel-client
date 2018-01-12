import {VNode} from "picodom";

export type Keys = string
export type State = {[k in Keys]: any}
export type Params = State;

export type View = (state: State) => VNode<any>
export type JSXElements = VNode<any>;
export type Children = VNode<{}>[];

export interface Page {
    state: State;
    view: View;
}

export interface GenericHooks {
    before?(done: (suppress?: boolean) => void, params?: Params): void;
    after?(params?: Params): void;
}

export interface Hooks {
    before?(done: (suppress?: boolean) => void, params?: Params): void;
    after?(params?: Params): void;
    leave?(params?: Params): void;
    already?(params?: Params): void;
}

export interface Routers {
    path: string;
    page: Page;
    hooks?: Hooks;
    routers?: Array<{[Router in keyof Routers] :any}>;
    defaultProps?: any;
}

export interface ConfigRouters {
    rootPath?: string;
    default?: string;
    notFound?: boolean;
    notFoundPath?: string;
    useHash?: boolean;
    genericHooks?: GenericHooks;
    notFoundHooks?: Hooks;
    hash?: string;
    defaultProps?: any;
    routers?: Array<{[Router in keyof Routers] :any}>;
}