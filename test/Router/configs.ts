import {ConfigRouters} from '../../src';

import {genericHooks, hooks} from './hooks';

import { testPage1 } from './mocks/TestPage1';
import { testPage4 } from './mocks/TestPage4';
import { testPage5 } from './mocks/TestPage5';
import { testPage2 } from './mocks/TestPage2';
import { testPage3 } from './mocks/TestPage3';
import { notFound } from './mocks/NotFoundPath';


export const configDefault: ConfigRouters = {
    routers: [{
        path: '/',
        page: testPage1,
        routers: [{
            path: '/child',
            page: testPage5
        }]
    }]
};

export const configSettings: ConfigRouters = {
    rootPath: 'http://localhost:9876/',
    default: '/home',
    useHash: true,
    genericHooks: genericHooks,
    notFound: true,
    hash: '#!',
    notFoundPath: '/not-found',
    routers: [{
        path: '/home',
        page: testPage1,
        routers: [{
            path: '/child/:number',
            page: testPage2,
            alias: 'child',
            hooks: hooks,
            routers: [{
                path: '/child2/:word',
                alias: 'grandchild',
                page: testPage3
            }]
        },{
            path: '/brother',
            page: testPage4
        }]
    },
    {
        path: '/not-found',
        page: notFound
    }]
};