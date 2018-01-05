import {States} from './helpers';
import { patch } from 'picodom';

let node: any;

export function render(view: any, state: {[S in States]: any}) {
    patch(node, (node = view(state)));
}