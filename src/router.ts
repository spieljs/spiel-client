import * as h from "picodom";
import { patch, VNode } from "picodom";
import { ConfigRouters, Routers, States } from "./helpers";
import { render } from "./render";
import Navigo = require("navigo");

export class Router {
    router: Navigo;
    store: any;
    configRoutes: ConfigRouters;

    setRouters(configRoutes: ConfigRouters) {
        configRoutes = configRoutes;
        const useHash = configRoutes.useHash;
        const hash = configRoutes.hash;
        this.router = new Navigo(null, useHash, hash);
        this.store = configRoutes.store;
        this.configRoutes = configRoutes;
        
        if(this.configRoutes.routers) this.build(this.configRoutes.routers);
        this.router.resolve();
        if(this.configRoutes.default) this.router.navigate(this.configRoutes.default);
    }

    private build(routers: Array<Routers>) {
        routers.forEach(route => {
            this.router.on(route.path, (params, query) => {
                this.setPatch(route, params, query);
            });
            
            if(route.routers) this.build(route.routers);
        });
    }

    private setPatch(component: any, params: Object, query: string) {
        const state: {[S in States]: any} = {};
        Object.assign(state, component.propsState);
        state.params = params;
        state.query = query;
        state.store = component.store || this.store;
        render(component.view, state);
    }

    go(path: string, absolute?: boolean) {
        this.router.navigate(path, absolute);
    }
}

export const router = new Router();