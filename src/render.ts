import { State, View} from './helpers';
import { patch , h} from 'picodom';

let element: Element;

/**
 * It creates the page with its componets 
 * @param view  The view JSX template of the page.
 * @param state The state object property of the page
 * @param root The root element
 */
export function goPath(view: View, state: State, root: string): void {
    element = patch(view(state), document.getElementById(root));
}

/**
* It updates the page with its components
*/
export function render(view: View, state: State): void {
    element = patch(view(state), element);
}