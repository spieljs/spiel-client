import {Hooks, Params} from '../../src';

type hooks = Hooks;

export const hooks = {
    before: (done: (suppress?: boolean) => void, params: Params) => {
        if(params) params.number = +params.number + 2;
        done();
    },
    after: (params: Params) => {
        if(params) params.number = +params.number + 2
    },
    leave: (params: Params) => {
        if(params) params.number = +params.number + 2
    },
    already: (params: Params) => {
        if(params) params.number = +params.number + 2
    }
}

export const genericHooks = {
    before: (done: (suppress?: boolean) => void, params: Params) => {
        if(params && params.number) params.number = +params.number + 2;
        done();
    },
    after: (params: Params) => {
        if(params && params.number) params.number = +params.number + 2;
    }
}