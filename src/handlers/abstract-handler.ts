import { NewCommandRequest } from "../commands/new";

export interface Handler {
    setNext(handler: Handler): Handler;

    handle(request: NewCommandRequest): void;
}

export abstract class AbstractHandler implements Handler {
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: NewCommandRequest) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}