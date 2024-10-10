import type {User} from "$lib/models/user";

export class Appstate {
    public userState: User;
    public windowWidth: number;

    constructor(userState: User, windowWidth: number) {
        this.userState = userState;
        this.windowWidth = windowWidth;
    }
}