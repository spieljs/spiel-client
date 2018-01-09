import {ConfigRouters} from '../../src'

import { testPage1 } from './mocks/TestPage1';
import { testPage4 } from './mocks/TestPage4';
import { testPage5 } from './mocks/TestPage5';

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