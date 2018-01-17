import { ConfigRouters, Routers, State, Params, Hooks,
    Handler, RoutersHandler } from "./helpers";
import { render } from "./render";
import Navigo = require('navigo');

/**
 * Router class handle whole the router config
 * for single page application. It use Navigo
 * @see <a href='https://github.com/krasimir/navigo' target="_blank">Navigo</a>
 * @preferred
 */
export class Router {
    private router: Navigo;
    private defaultProps: any;
    private configRouters: ConfigRouters;
    private useHash: boolean;
    private hash: string;

    /**
    * It set all the path config with additionals settings
    * @param configRouters  router settings
    * @return Router object
    * @see <a href="../interfaces/_helpers_interfaces_.configrouters.html">ConfigRouters</a>
    */
    setRouters(configRouters?: ConfigRouters): Router {
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

    /**
     * It goes to the path indicated
     * @param path Path of the route, example: /example
     * @param absolute True allow to pass absolute path, example: router.go("http://localhost/example", true)
     */
    go(path: string, absolute?: boolean) {
        this.router.navigate(path, absolute);
    }

    /**
     * It Removes all the routes
     * @since 0.2.1
     */
    destroy() {
        this.router.destroy();
    }
    
    /**It disables the route if History API is not supported
     * @since 0.2.1
     */
    disableIfAPINotAvailable() {
        this.router.disableIfAPINotAvailable();
    }

    /** It generates an url based in alias route
    * @param path Path of the route to genarate
    * @param params Params included in the url to generate
    * @return Url
    * @see <a href='https://github.com/spiel-framework/spiel-client#first-config-you-routes'>Generate links</a>
    * @since 0.2.1
    */
    generate(path: string, params?: Params):string {
        return this.router.generate(path, params);
    }

    /** It gets the link of the anchor element
    * @param link Anchor link which contains the data-navigo attribute
    * @return Path url
    * @since 0.3.0
    */
    getLinkPath(link: HTMLAnchorElement): string {
        return this.router.getLinkPath(link);
    }

    /** It disables a router, example: router.off('/example', handle) 
    * @param path Path of the route to disable
    * @param handler Handler of the route to disable
    * @since 0.3.0
    */
    off(path: string, handler: Handler) {
        this.router.off(path, handler);
    }

    /** It creates multiple routes 
    * @param routers It declares all the routers to create
    * @since 0.3.0
    */
    onMultiple(routers: RoutersHandler) {
        this.router.on(routers);
    }

    /**It adds new route 
    * @param path Path of the route to add
    * @param handler Handler of the route to add
    * @param hooks Hooks of execution when access to the route
    * @since 0.2.1
    */
    on(path: string, handler: Handler, hooks?: Hooks) {
        this.router.on(path, handler, hooks);
    }

    /**It adds default route
    * @param handler Handler of the default route to add
    * @param hooks Hooks of execution when access to the default route
    * @since 0.2.1
    */
    onDefault(handler: Handler, hooks?: Hooks){
        this.router.on(handler, hooks);
    }
    
    /**It gives you a chance to change the route without resolving. Make sure that you call 
    * @param change false value returns to the previous working state
    * @since 0.2.1
    */
    pause(change: boolean = true) {
        this.router.pause(change);
    }

    /**It resolves all the routes registered
    * @param currentUrl
    * @since 0.2.1
    */
    resolve(currentUrl?: string) {
        this.router.resolve(currentUrl);
        if(!this.router.lastRouteResolved().url) {
            this.checkDefault();
        }
    }

    /**
    * It returns to the previous working state. [resum() === pause(false)]
    * @since 0.2.1
    */
    resume() {
        this.router.resume();
    }

    /** 
    * @return Returns an object with the format of { url: <string>, query: <string> } matching the latest resolved route
    * @since 0.2.1
    */
    lastRouteResolved(): {url: string, query: string} {
        return this.router.lastRouteResolved();
    }

    /**
    * @param path The path of the route
    * @return The full url of the path
    * @since 0.2.1
    */
    link(path: string): string {
        return this.router.link(path);
    }

    /**
    * It triggers the data-navigo links binding process
    * @since 0.2.1
    */
    updatePageLinks() {
        this.router.updatePageLinks();
    }

    /**By default the router uses History.pushState and changes that to History.replaceState 
    * if the router is paused. If you need to always use pushState even
    * if the router is paused use this method 
    * like router.historyAPIUpdateMethod('pushState') after calling pause
    * @param method Method history could be pushState or replaceState
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method" target="_blank">pushState method</a>
    * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState()_method" target="_blank">replaceState method</a>
    * @since 0.3.0
    */
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