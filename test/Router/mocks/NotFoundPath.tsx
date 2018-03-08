import {h, IPage, render, State} from "../../../src";

export class NotFound implements IPage {
    public state = {
        message: "Page not found sorry",
    };

    public view(state: State) {
        return (
            <div>
                <h1>{state.message}</h1>
            </div>
        );
    }
}

export const notFound = new NotFound();
