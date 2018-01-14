import { ConfigRouters, Routers, State, Params, Hooks,
    Handler, RoutersHandler } from "./helpers";
import { render } from "./render";
import Navigo = require('navigo');

export class Router {
    private router: Navigo;
    private defaultProps: any;
    private configRouters: ConfigRouters;
    private useHash: boolean;
    private hash: string;

    setRouters(configRouters?: ConfigRouters) {
        this.configRouters = configRouters || {};
        this.useHash = (this.configRouters.useHash !== undefined) ?
            this.configRouters.useHash : true;
        this.hash = this.configRouters.hash || '#';
        this.router = new Navigo(this.configRouters.rootPath || null, this.useHash, this.hash);
        if(this.configRouters.genericHooks) this.router.hooks(this.configRouters.genericHooks);
        this.defaultProps = this.configRouters.defaultProps;
        if(this.configRouters.routers) this.build(this.configRouters.routers);
        this.checkNotFound();
        return this;
    }

    go(path: string, absolute?: boolean) {
        this.router.navigate(path, absolute);
    }

    destroy() {
        this.router.destroy();
    }

    disableIfAPINotAvailable() {
        this.router.disableIfAPINotAvailable();
    }

    generate(path: string, params?: Params) {
        return this.router.generate(path, params);
    }

    getLinkPath(link: HTMLAnchorElement){
        return this.router.getLinkPath(link);
    }

    onMultiple(routers: RoutersHandler) {
        this.router.on(routers);
    }

    on(path: string, handle: Handler, hooks?: Hooks) {
        this.router.on(path, handle, hooks);
    }

    onDefault(action: (param?: Params, query?: string) => void, hooks?: Hooks){
        this.router.on(action, hooks);
    }

    pause(change?: boolean) {
        this.router.pause(change);
    }

    resolve(currentUrl?: string) {
        this.router.resolve(currentUrl);
        if(!this.router.lastRouteResolved().url) {
            this.checkDefault();
        }
    }

    resume() {
        this.router.resume();
    }

    lastRouteResolved(): {url: string, query: string} {
        return this.router.lastRouteResolved();
    }

    link(path: string) {
        return this.router.link(path);
    }

    updatePageLinks() {
        return this.router.updatePageLinks();
    }

    historyAPIUpdateMethod(method?: string) {
        this.router.historyAPIUpdateMethod(method);
    }

    private build(configRouters: Array<Routers>, parentPath?: string) {
        configRouters.forEach((router, index) => {
            if(parentPath) router.path = `${parentPath}${router.path}`;
            if(router.alias) {
                this.router.on(router.path, {
                    as: router.alias, uses: (params, query) => {
                        this.setPatch(router, params, query);
                    }
                }, router.hooks);
            } else {

                this.router.on(router.path, (params, query) => {
                    this.setPatch(router, params, query);
                }, router.hooks);
            }
            if(router.routers) this.build(router.routers, router.path);
        });
    }

    private setPatch(route: Routers, params: Object, query: string) {
        const page = route.page;
        const state: State = {};
        Object.assign(state, page.state);
        state.params = params;
        state.query = query;
        state.defaultProps = route.defaultProps || this.defaultProps;
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