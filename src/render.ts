import {States} from './helpers';
import { patch, VNode } from 'picodom';

export function render(view: any, state: {[S in States]: any}) {
    let node: any;
    patch(node, (node = view(state)));
}