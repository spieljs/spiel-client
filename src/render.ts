import { State, View} from './helpers';
import { patch } from 'picodom';

let node: any;

export function render(view: View, state: State) {
    patch(node, (node = view(state)));
}