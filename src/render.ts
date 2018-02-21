import { State, View} from './helpers';
import { patch , h} from 'picodom';

let element: Element;

/**
 * It creates the page with its componets 
 * @param view  The view JSX template of the page.
 * @param state The state object property of the page
 * @param rootElement The root element
 */
export function render(view: View, state: State, rootElement?: Element | null): Element {
    element = patch(view(state), rootElement || element);
    return element;
}