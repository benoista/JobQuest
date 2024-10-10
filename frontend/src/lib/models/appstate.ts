import type {User} from "$lib/models/user";

export class Appstate {
    public userState: User | null;
    public windowWidth: number;

    constructor(userState: User | null, windowWidth: number) {
        this.userState = userState;
        this.windowWidth = windowWidth;
    }
}