import Navigo = require("navigo");
import { render, State} from "spiel-render";
import { h, patch } from "ultradom";
import { Handler, IConfigRouters, IHooks, IRouters, IRoutersHandler, Params } from "./helpers";

/**
 * Router class handle whole the router config
 * for single page application. It use Navigo
 * @see <a href='https://github.com/krasimir/navigo' target="_blank">Navigo</a>
 */
export class Router {
    /** This attribute include the navigo singleton which is possible
     * to access all its methods
     * @see <a href='https://github.com/krasimir/navigo#api' target="_blank">Navigo API</a>
     * @since 0.3.3
     */
    public router!: Navigo;
    private defaultProps: any;
    private configRouters!: IConfigRouters;
    private useHash!: boolean;
    private hash!: string;
    private root!: string;
    private element!: Element;

    /**
     * It set all the path config with additionals settings
     * @param configRouters  router settings
     * @return Router object
     * @see <a href="../interfaces/_helpers_interfaces_.iconfigrouters.html">IConfigRouters</a>
     */
    public setRouters(configRouters?: IConfigRouters): Router {
        this.configRouters = configRouters || {};
        this.useHash = (this.configRouters.useHash !== undefined) ?
            this.configRouters.useHash : true;
        this.hash = this.configRouters.hash || "#";
        this.root = this.configRouters.root || "app";
        this.createRootElement();
        this.router = new Navigo(this.configRouters.rootPath || null, this.useHash, this.hash);
        if (this.configRouters.genericHooks) {
            this.router.hooks(this.configRouters.genericHooks);
        }
        this.defaultProps = this.configRouters.defaultProps;
        if (this.configRouters.routers) {
            this.build(this.configRouters.routers);
        }
        this.checkNotFound();
        return this;
    }

    /**
     * It goes to the path indicated
     * @param path Path of the route, example: /example
     * @param absolute True allow to pass absolute path
     * @example router.go("http://localhost/example", true)
     */
    public go(path: string, absolute?: boolean) {
        this.router.navigate(path, absolute);
    }

    /**It resolves all the routes registered
     * @param currentUrl
     * @since 0.2.1
     */
    public resolve(currentUrl?: string) {
        this.router.resolve(currentUrl);
        if (!this.router.lastRouteResolved().url) {
            this.checkDefault();
        }
    }

    /**
     * It triggers the data-navigo links binding process
     * @since 0.2.1
     */
    public updatePageLinks() {
        this.router.updatePageLinks();
    }

    private createRootElement() {
        const rootElement = document.getElementById(this.root);
        const node = h("div", {});
        if (!rootElement) {
            const elm = document.createElement("div");
            elm.setAttribute("id", this.root);
            document.body.appendChild(elm);
            this.element = patch(node, document.getElementById(this.root));
        } else {
            this.element = patch(node, document.getElementById(this.root));
        }
    }

    private build(configRouters: IRouters[], parentPath?: string) {
        configRouters.forEach((router, index) => {
            if (parentPath) {
                router.path = `${parentPath}${router.path}`;
            }
            if (router.alias) {
                this.router.on(router.path, {
                    as: router.alias, uses: (params, query) => {
                        this.setPatch(router, params, query);
                    },
                }, router.hooks);
            } else {

                this.router.on(router.path, (params, query) => {
                    this.setPatch(router, params, query);
                }, router.hooks);
            }
            if (router.routers) {
                this.build(router.routers, router.path);
            }
        });
    }

    private setPatch(route: IRouters, params: object, query: string) {
        const page = route.page;
        const state: State = {};
        Object.assign(state, page.state);
        state.params = params;
        state.query = query;
        state.defaultProps = route.defaultProps || this.defaultProps;
        render(page.view, state, this.element);
    }

    private checkNotFound() {
        this.router.notFound(() => {
            if (this.configRouters.notFound && this.configRouters.notFoundPath &&
                ((window.location.hash && window.location.hash !== this.hash && this.useHash) ||
                (window.location.pathname !== "/" && !this.useHash))) {
                this.go(this.configRouters.notFoundPath);
            } else {
                this.checkDefault();
            }
        }, this.configRouters.notFoundHooks);
    }

    private checkDefault() {
        if (this.configRouters.default) {
            this.go(this.configRouters.default);
        } else {
            this.go("/");
        }
    }
}

export const srouter = new Router();
