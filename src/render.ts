import { State, View} from './helpers';
import { patch } from 'picodom';

let node: any;

/**
 * Render function creates or updates the page with its componets 
 * @param view  The view JSX template of the page.
 * @param state The state object property of the page
 */
export function render(view: View, state: State) {
    patch(node, (node = view(state)));
}