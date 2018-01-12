import { ConfigRouters, Routers, State, Params, Hooks } from "./helpers";
import { render } from "./render";
import Navigo = require('navigo');

export class Router {
    private router: Navigo;
    private store: any;
    private configRouters: ConfigRouters;
    private useHash: boolean;
    private hash: string;

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

    go(path: string, absolute?: boolean) {
        this.router.navigate(path, absolute);
    }

    destroy() {
        this.router.destroy();
    }

    onChild(path: 'string', action: (param?: Params, query?: string) => void, hooks: Hooks) {
        this.router.on(path, action, hooks);
    }

    onRoot(action: (param?: Params, query?: string) => void, hooks?: Hooks){
        this.router.on(action, hooks);
    }

    pause() {
        this.router.pause();
    }

    resolve(currentUrl?: string) {
        this.router.resolve(currentUrl);
    }

    link(path: string) {
        this.router.link(path);
    }

    disableIfAPINotAvailable() {
        this.router.disableIfAPINotAvailable();
    }

    updatePageLinks() {
        this.router.updatePageLinks();
    }

    private build(configRouters: Array<Routers>, parentPath?: string) {
        configRouters.forEach((router, index) => {
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
        this.router.notFound(()=> {
            if(this.configRouters.notFound && this.configRouters.notFoundPath &&
                ((window.location.hash && window.location.hash !== this.hash && this.useHash) ||
                (window.location.pathname !== "/" && !this.useHash))) {
                this.go(this.configRouters.notFoundPath);
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
}

export const router = new Router();