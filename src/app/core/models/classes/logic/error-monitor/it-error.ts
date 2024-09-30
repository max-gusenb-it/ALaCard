import { IItError } from "../../../interfaces";

export class ItError extends Error {
    location: string;

    constructor(msg: string, location: string) {
        super(msg);

        this.location = location;
        Object.setPrototypeOf(this, ItError.prototype);
    }

    exportError(): IItError {
        return {
            code: this.message,
            location: this.location
        }
    }
}