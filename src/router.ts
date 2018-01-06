import { ConfigRouters, Routers, State } from "./helpers";
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
        this.checkNotFound();
        this.router.resolve();
        const lastRoute = this.router.lastRouteResolved();
        if(!lastRoute.url) {
            this.checkDefault();
        }
    }

    private build(routers: Array<Routers>, parentPath?: string) {
        routers.forEach(router => {
            if(parentPath) router.path = `${parentPath}${router.path}`;
            this.router.on(router.path, (params, query) => {
                this.setPatch(router, params, query);
            });
            
            if(router.routers) this.build(router.routers, router.path);
        });
    }

    private setPatch(route: Routers, params: Object, query: string) {
        const page = route.page;
        const state: State = {};
        Object.assign(state, page.state);
        state.params = params;
        state.query = query;
        state.store = route.store || this.store;
        render(page.view, state);
    }

    private checkNotFound() {
        this.router.notFound(()=> {
            if(this.configRoutes.notFound) {
                const notFound = this.configRoutes.notFound;
                render(notFound.view, notFound.state);
            }
            else {
                this.checkDefault();

            }
        })
    }

    private checkDefault() {
        if(this.configRoutes.default) {
            this.go(this.configRoutes.default);
        } else {
            this.go('/');
        }
    }

    go(path: string, absolute?: boolean) {
        this.router.navigate(path, absolute);
    }
}

export const router = new Router();