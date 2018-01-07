import { ConfigRouters, Routers, State } from "./helpers";
import { render } from "./render";
import Navigo = require("navigo");

export class Router {
    router: Navigo;
    store: any;
    configRouters: ConfigRouters;
    useHash: boolean;
    hash: string;

    setRouters(configRouters: ConfigRouters) {
        this.configRouters = configRouters;
        this.useHash = (this.configRouters.useHash !== undefined) ?
            this.configRouters.useHash : true;
        this.hash = configRouters.hash || '#';
        this.router = new Navigo(this.configRouters.rootPath || null, this.useHash, this.hash);
        if(this.configRouters.genericHooks) this.router.hooks(this.configRouters.genericHooks);
        this.store = this.configRouters.store;
        if(this.configRouters.routers) this.build(this.configRouters.routers);
        this.checkNotFound();
        this.router.resolve();
        if(!this.router.lastRouteResolved().url) {
            this.checkDefault();
        }
    }

    private build(routers: Array<Routers>, parentPath?: string) {
        routers.forEach(router => {
            if(parentPath) router.path = `${parentPath}${router.path}`;
            this.router.on(router.path, (params, query) => {
                this.setPatch(router, params, query);
            }, router.hooks);
            
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
        console.log(window.location)
        this.router.notFound(()=> {
            if(this.configRouters.notFound && 
                ((window.location.hash && window.location.hash !== this.hash && this.useHash) ||
                (window.location.pathname !== "/" && !this.useHash))) {
                const notFound = this.configRouters.notFound;
                render(notFound.view, notFound.state);
            }
            else {
                this.checkDefault();

            }
        }, this.configRouters.notFoundHooks);
    }

    private checkDefault() {
        if(this.configRouters.default) {
            this.go(this.configRouters.default);
        } else {
            this.go('/');
        }
    }

    go(path: string, absolute?: boolean) {
        this.router.navigate(path, absolute);
    }
}

export const router = new Router();