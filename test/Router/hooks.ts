import { IGenericHooks, IHooks, Params} from "../../src";

export const hooks: IHooks = {
    after: (params: Params) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
    already: (params: Params) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
    before: (done: (suppress?: boolean) => void, params: Params) => {
        if (params) {
            params.number = +params.number + 2;
        }
        done();
    },
    leave: (params: Params) => {
        if (params) {
            params.number = +params.number + 2;
        }
    },
};

export const genericHooks: IGenericHooks = {
    after: (params: Params) => {
        if (params && params.number) {
            params.number = +params.number + 2;
        }
    },
    before: (done: (suppress?: boolean) => void, params: Params) => {
        if (params && params.number) {
            params.number = +params.number + 2;
        }
        done();
    },
};
