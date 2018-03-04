import {State, View} from "spiel-render";
import {VNode} from "ultradom";

export type Keys = string;
export type Params = State;
export type Handler = ((params: Params, query: string) => void) |
 { as: string; uses(params: Params, query: string): void };

export interface IRoutersHandler {
    [key: string]: Handler;
}

/**
 * @see <a href='https://github.com/spieljs/spiel-client#create-your-page-components'>Page example</a>
 */
export interface IPage {
    /** State object with all the properties of the page component */
    state: State;
    /** The JSX view template of the page component */
    view: View;
}

/**
 * @see <a href='https://github.com/spieljs/spiel-client/tree/picodom-test#set-your-generic-hooks-for-all-the-routes'>
 * Generic Hooks example</a>
 */
export interface IGenericHooks {
    /** Before to resolve the route
     * @param done To execute when finish async operation with done()
     * @param params Params of the path, example: /user:id => params.id
     */
    before?(done: (suppress?: boolean) => void, params?: Params): void;
    /** After resolving
     * @param params Params of the path
     * @example: /user:id => params.id
     */
    after?(params?: Params): void;
}

/**
 * @see <a href='https://github.com/spieljs/spiel-client/tree/picodom-test#and-your-hooks-for-expecific-route'>
 * Hooks example</a>
 */
export interface IHooks {
    /** Before to resolve the route
     * @param done To execute when finish async operation with done()
     * @param params Params of the path
     * @example: /user:id => params.id
     */
    before?(done: (suppress?: boolean) => void, params?: Params): void;
    /** After resolving
     * @param params Params of the path
     * @example: /user:id => params.id
     */
    after?(params?: Params): void;
    /** When you are going out of the that route
     * @param params Params of the path
     * @example: /user:id => params.id
     */
    leave?(params?: Params): void;
    already?(params?: Params): void;
}

export interface IRouters {
    /** Page component path */
    path: string;
    /** Singleton Page component class
     * @see <a href="_helpers_interfaces_.page.html">Page</a>
     */
    page: IPage;
    /** Alias route to allow generate an url
     * @since 0.3.3
     */
    alias?: string;
    /** It assigns hooks for this route
     * @see <a href="_helpers_interfaces_.hooks.html">Hooks</a>
     */
    hooks?: IHooks;
    /** It adds page childreen
     * @see <a href="_helpers_interfaces_.routers.html">Routers</a>
     */
    routers?: Array<{[Router in keyof IRouters] : any}>;
    /** It assigns default props state for this route */
    defaultProps?: any;
}

/**
 * @see <a href='https://github.com/spieljs/spiel-client#first-config-you-routes'>Config routes example</a>
 */
export interface IConfigRouters {
    /** The main URL of the application. without parameters
     *  then the router figures out the root URL based on your routes
     *  It is strongly recommend to set a root value
     */
    rootPath?: string;
    /** The default path which the application goes when it starts */
    default?: string;
    /** It enable not found page
     * @default false
     */
    notFound?: boolean;
    /** Path of not found page */
    notFoundPath?: string;
    /** It enable useHash
     * @default true
     */
    useHash?: boolean;
    /** Generic hooks will run in every path access
     * @see <a href="_helpers_interfaces_.generichooks.html">GenericHooks</a>
     */
    genericHooks?: IGenericHooks;
    /** Hooks for not found page */
    notFoundHooks?: IHooks;
    /** It set the hash route
     * @default #
     */
    hash?: string;
    /** It assigns to state for every page default props */
    defaultProps?: any;
    /** It set default props in every path page
     * @see <a href="_helpers_interfaces_.routers.html">Routers</a>
     */
    routers?: Array<{[Router in keyof IRouters] : any}>;
    /**
     * Name of the aplication which will use for the root element
     * @default app
     * @since 1.0.0
     */
    root?: string;
}
