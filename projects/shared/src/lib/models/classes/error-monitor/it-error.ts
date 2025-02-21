import { IItError } from "@shared";

// ToDo - structure: Check if any of the models can be moved to features

export class ItError extends Error {
    location: string;

    constructor(msg: string, location: string, method?: string) {
        super(msg);

        this.location = location + "-" + method;
        Object.setPrototypeOf(this, ItError.prototype);
    }

    exportError(): IItError {
        return {
            code: this.message,
            location: this.location
        }
    }
}