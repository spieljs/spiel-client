import 'reflect-metadata';

declare let node: any;

export { router, Router} from './router';
export { patch, h, Component } from "picodom";
export { render } from "./render";
export { ConfigRouters, State, View, Page, Hooks, GenericHooks, Params } from './helpers'